import { DURATION } from '../internal/enums';
import { hashPassword, verifyPassword } from '../utils/bcrypt-utils';
import { Redis } from 'ioredis';
import { prefixedKey } from '../utils/prefixed-key';

export interface CreateOtpArgs {
  /** Key that would be linked to the otp  */
  key: string;
  /** length of the otp (default is 6) */
  length?: number;
  /** when otp expires (default is 60 seconds)  */
  expiresIn?: number;
}

export class Otp {
  private readonly prefix = 'otp';

  constructor(private readonly appCache: Redis) {}

  private otpKey(key: string) {
    return prefixedKey(this.prefix, key);
  }

  public async generate({
    key,
    length = 6,
    expiresIn = 60 * DURATION.SECONDS,
  }: CreateOtpArgs): Promise<string> {
    const randomBase = Math.floor(Math.random() * 10 ** length);
    const randomFill = Math.floor(Math.random() * 9);
    const otp = randomBase.toString().padStart(length, randomFill.toString());

    const otpHash = await hashPassword(otp);

    await this.appCache.set(this.otpKey(key), otpHash, 'PX', expiresIn);

    return otp;
  }

  public async verify(key: string, otp: string): Promise<boolean> {
    const otpHashInCache = await this.appCache.get(this.otpKey(key));

    if (otpHashInCache == null) return false;

    const matchesHash = await verifyPassword(otp, otpHashInCache);

    if (matchesHash) {
      await this.appCache.del(key);
      return true;
    }
    return false;
  }

  public async revoke(key: string): Promise<void> {
    const otpHashInCache = await this.appCache.get(this.otpKey(key));

    if (otpHashInCache == null) return;

    await this.appCache.del(key);
  }
}
