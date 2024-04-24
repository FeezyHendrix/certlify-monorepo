import { FastifyInstance } from 'fastify';
import authenticationRoutes from '../features/authentication/authentication.route';

const V1_PREFIX = '/api/v1';
export default async function (fastify: FastifyInstance) {
  fastify.register(authenticationRoutes, { prefix: `${V1_PREFIX}/auth` });
}
