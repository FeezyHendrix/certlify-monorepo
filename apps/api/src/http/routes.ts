import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { controllers } from './controllers';
import { routePrefix } from '../utils/route-prefix';

export const v1Prefix = routePrefix('api/v1');

export function routes(
  fastify: FastifyInstance,
  opt: FastifyPluginOptions,
  done: (err?: any) => void
) {
  fastify.decorateRequest('claim', null);
  fastify.decorateRequest('claimId', '');

  for (const controller of controllers) {
    controller(fastify, opt, done);
  }
}
