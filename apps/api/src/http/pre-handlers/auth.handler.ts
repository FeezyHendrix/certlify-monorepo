import { FastifyReply, FastifyRequest } from 'fastify';
import { RouterFastifyCtx } from '../../internal/http';
import { HttpException } from '../../internal/errors';
import httpStatus from 'http-status';
import { AuthClaim } from '../../internal/types';
import { InvalidTokenError, TokenAuth } from '../../modules/token-auth';
import Deasyncify from 'deasyncify';

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

  const [tokenPayload, err] = await Deasyncify.watch(
    tokenAuth.verify<AuthClaim>(auth_token)
  );

  if (err != null) {
    if (err instanceof InvalidTokenError) {
      throw new HttpException(httpStatus.UNAUTHORIZED, 'unauthorized');
    }

    throw err;
  }

  (request as any).claim = tokenPayload;
  (request as any).claimId = await tokenAuth.getTokenId(auth_token);
}
