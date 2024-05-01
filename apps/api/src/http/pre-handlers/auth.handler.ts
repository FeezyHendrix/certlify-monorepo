import { FastifyReply, FastifyRequest } from 'fastify';
import { RouterFastifyCtx } from '../../internal/http';
import { HttpException } from '../../internal/errors';
import httpStatus from 'http-status';
import { AuthClaim } from '../../internal/types';
import { TokenAuth } from '../../modules/token-auth';

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function authPreHandler(
  request: FastifyRequest,
  _: FastifyReply,
  _done: (err?: any) => void
) {
  const ctx = <RouterFastifyCtx>this;

  const tokenAuth = <TokenAuth>ctx.tokenAuth;

  const auth_token = request.headers?.authorization?.split?.(' ')?.[1];

  if (auth_token == null || auth_token == '') {
    throw new HttpException(httpStatus.UNAUTHORIZED, 'unauthorized');
  }

  const tokenPayload = await tokenAuth.decode<AuthClaim>(auth_token);

  if (tokenPayload == null) {
    throw new HttpException(httpStatus.UNAUTHORIZED, 'unauthorized');
  }

  (request as any).claim = tokenPayload;
  (request as any).claimId = await tokenAuth.getTokenId(auth_token);
}
