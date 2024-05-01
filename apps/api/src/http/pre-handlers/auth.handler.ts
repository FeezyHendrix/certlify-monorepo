import { FastifyReply, FastifyRequest } from 'fastify';
import { RouterFastifyCtx } from '../../internal/http';
import { TokenStore } from '../../internal/token-store';
import { HttpException } from '../../internal/errors';
import httpStatus from 'http-status';
import { AuthClaim } from '../../internal/types';

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function authPreHandler(
  request: FastifyRequest,
  _: FastifyReply,
  _done: (err?: any) => void
) {
  const ctx = <RouterFastifyCtx>this;

  const tokenStore = <TokenStore>ctx.tokenStore;

  const token = request.headers?.authorization?.split?.(' ')?.[1];

  if (token == null || token == '') {
    throw new HttpException(httpStatus.UNAUTHORIZED, 'unauthorized');
  }

  const tokenPayload = await tokenStore.peek<AuthClaim>(token);

  if (tokenPayload == null) {
    throw new HttpException(httpStatus.UNAUTHORIZED, 'unauthorized');
  }

  (request as any).claim = tokenPayload;
}
