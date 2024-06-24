import crypto from 'crypto';
import { Redis } from 'ioredis';
import { prefixedKey } from '../utils/prefixed-key';

export class TokenStore {
  private readonly prefix = 'token_store';

  constructor(private secret: string, private redis: Redis) {}

  private tokenKey(token: string) {
    return prefixedKey(this.prefix, token);
  }

  async commision<T = any>(
    key: string,
    val: T,
    time?: number
  ): Promise<string> {
    const token = crypto
      .createHmac('sha256', this.secret)
      .update(key)
      .digest('hex');

    const content = JSON.stringify(val);

    if (time == null) {
      await this.redis.set(this.tokenKey(token), content);
    } else {
      await this.redis.set(this.tokenKey(token), content, 'PX', time);
    }

    return token;
  }

  async replicateToken(key: string): Promise<string> {
    return crypto.createHmac('sha256', this.secret).update(key).digest('hex');
  }

  async peek<T = any>(token: string): Promise<T> {
    const result = await this.redis.get(this.tokenKey(token));

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  async extend<T = any>(token: string, time: string): Promise<T> {
    const result = await this.redis.get(this.tokenKey(token));

    if (!result) {
      return null;
    }

    await this.redis.pexpire(this.tokenKey(token), time);

    return JSON.parse(result);
  }

  async reset<T = any>(key: string, newVal: T): Promise<void> {
    const token = crypto
      .createHmac('sha256', this.secret)
      .update(key)
      .digest('hex');

    // make sure the token exists
    const result = await this.redis.get(this.tokenKey(token));
    if (!result) return;

    const content = JSON.stringify(newVal);
    const ttl = await this.redis.pttl(this.tokenKey(token));

    await this.redis.set(this.tokenKey(token), content, 'PX', ttl);
  }

  async decommission<T = any>(token: string): Promise<T> {
    const result = await this.redis.get(this.tokenKey(token));

    if (!result) {
      return null;
    }

    await this.redis.del(this.tokenKey(token));

    return JSON.parse(result);
  }

  async revoke(key: string): Promise<void> {
    const token = crypto
      .createHmac('sha256', this.secret)
      .update(key)
      .digest('hex');

    await this.redis.del(this.tokenKey(token));
  }
}
