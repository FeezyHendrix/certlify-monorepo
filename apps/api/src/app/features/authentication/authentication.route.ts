import { FastifyInstance } from "fastify"
import { loginController, registerController } from "./authentication.controller"
import { CreateUserSchema } from "./authentication.validation"


export default function authenticationRoutes(fastify: FastifyInstance, opts, done) {
  fastify.decorate('user', '');

  fastify.route({
    method: 'POST',
    url: '/login',
    handler: loginController
  });

  fastify.route({
    method: 'POST',
    schema: {
      body: CreateUserSchema,
    },
    url: '/register',
    handler: registerController
  });
}
