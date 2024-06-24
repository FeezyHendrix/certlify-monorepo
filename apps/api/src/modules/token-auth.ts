import { TokenStore } from '../internal/token-store';
import { customAlphabet } from 'nanoid';

const genTokenId = customAlphabet('abcdefghijklmnopqrstuvwzyz123456789');

export class InvalidTokenError extends Error {
  constructor() {
    super('INVALID_TOKEN');
  }
}

export class TokenAuth {
  constructor(private readonly tokenStore: TokenStore) {}

  async generate<T = any>(data: T, expiresIn?: number): Promise<string> {
    const id = genTokenId(32);

    const auth_token = await this.tokenStore.commision(id, data, expiresIn);

    return `${id}.${auth_token}`;
  }

  async decode<T = any>(auth_token: string): Promise<T> {
    const token = auth_token.split('.')?.[1];

    if (token == null || token == '') return;

    const content = await this.tokenStore.peek<T>(token);

    return content;
  }

  async verify<T = any>(auth_token: string): Promise<T> {
    const [id, token] = auth_token.split('.');

    if (!id || !token) throw new InvalidTokenError();

    const content = await this.tokenStore.peek<T>(token);

    if (content == null) throw new InvalidTokenError();

    const replicatedToken = await this.tokenStore.replicateToken(id);

    if (token != replicatedToken) throw new InvalidTokenError();

    return content;
  }

  async invalidate(authToken: string) {
    const token = authToken.split('.')?.[1];

    if (token == null || token == '') return;

    await this.tokenStore.decommission(token);
  }

  async getTokenId(auth_token: string): Promise<string> {
    const [id, token] = auth_token.split('.');

    if (token == null || token == '') return;

    const content = await this.tokenStore.peek(token);

    if (content == null) return;

    return id;
  }

  async revoke(id: string): Promise<void> {
    await this.tokenStore.revoke(id);
  }
}
