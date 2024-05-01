import { FastifyReply, FastifyRequest } from 'fastify';

type FastifyRouteHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

const catchAsync = (fn: FastifyRouteHandler): FastifyRouteHandler => {
  return async (request, reply) => {
    try {
      await fn(request, reply);
    } catch (err) {
      request.log.error(err, 'Error caught in catchAsync');
      throw err;
    }
  };
};

export default catchAsync;
