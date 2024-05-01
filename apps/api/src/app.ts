import fastify, { FastifyServerOptions } from 'fastify';
import httpStatus from 'http-status';
import { HttpException } from './internal/errors';
import * as path from 'path';
import AutoLoad from '@fastify/autoload';
import { routes, v1Prefix } from './http/routes';

export function App(opts: FastifyServerOptions = {}) {
  const app = fastify(opts);

  app.register(routes, { prefix: v1Prefix() });

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof HttpException) {
      reply.status(error.status).send({ message: error.message });
    } else if (error.validation) {
      reply.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    } else if (error instanceof SyntaxError) {
      reply.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid json' });
    } else {
      // log only internal server errors
      app.log.error(error);

      reply
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error!' });
    }
  });

  return app;
}
