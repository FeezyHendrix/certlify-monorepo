import Fastify from 'fastify';
import { app } from './app/app';
import { HttpException } from './app/utils/errors';
import httpStatus from 'http-status';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

function configureErrorHandling(server): void {
  server.setErrorHandler(function (error, request, reply) {
    this.log.error(error);

    if (error instanceof HttpException) {
      reply
        .status(error.status)
        .send({ message: error.message, stack: error.stack });
      return;
    }

    if (error instanceof PrismaClientKnownRequestError) {
      console.log('INSTANCE OF PRISMA ERROR');
      if (error.code === 'P2002') {
        reply.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid data ' });
        return;
      }
    }

    reply
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal Server Error!' });
  });
}


const server = Fastify({
  logger: true,
});

server.register(app);

configureErrorHandling(server);

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
