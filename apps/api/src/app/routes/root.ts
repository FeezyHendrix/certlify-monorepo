import { FastifyInstance } from 'fastify';
import { PrismaClient, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async function () {
    return { message: 'Hello API' };
  });

  fastify.post('/login', async function (request, reply) {
    // Placeholder for login logic
    return { message: 'Login successful' };
  });

  fastify.post('/login-google', async function (request, reply) {
    // Placeholder for Google login logic
    return { message: 'Login with Google successful' };
  });

  fastify.post('/login-github', async function (request, reply) {
    // Placeholder for GitHub login logic
    return { message: 'Login with GitHub successful' };
  });

  fastify.post('/logout', async function (request, reply) {
    // Placeholder for logout logic
    return { message: 'Logout successful' };
  });

  const bodyJsonSchema = {
    type: 'object',
    required: [
      'email',
      'password',
      // Todo: sort password confirmation
      // 'password_confirmation',
      'first_name',
      'last_name',
    ],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
      // password_confirmation: { type: 'string', const: { $data: '/password' } },
      first_name: { type: 'string', minLength: 2 },
      last_name: { type: 'string', minLength: 2 },
      industry: { type: 'array' },
      occupation: { type: 'array' },
    },
    additionalProperties: false,
  };

  const schema = {
    body: bodyJsonSchema,
  };

  interface UserCreateInput {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    industry: string[];
    occupation: string[];
  }

  function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }

  fastify.post('/register', { schema }, async function (request, reply) {
    const data = request.body as UserCreateInput;
    data.id = ulid();

    try {
      const user = await prisma.user.create({
        data,
      });

      return {
        message: 'Registration successful',
        data: { ...user, token: generateAccessToken(user.email) },
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          return {
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid data',
          };
        }
      }

      throw error;
    }
  });

  fastify.post('/verify-email', async function (request, reply) {
    // This route should handle the verification of user emails
    return { message: 'Email verification logic to be implemented' };
  });

  fastify.post('/forgot-password', async function (request, reply) {
    // Placeholder for forgot password logic
    return { message: 'Reset password link sent' };
  });

  fastify.post('/reset-password', async function (request, reply) {
    // Placeholder for reset password logic
    return { message: 'Password reset successfully' };
  });
}
