import { FastifyReply, FastifyRequest } from "fastify"
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status';
import { UserCreateInput } from "./authentication.types"
import { registerService } from "./authentication.service"

export const loginController = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(httpStatus.OK).send({ message: 'Login successful' });
});

export const registerController = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const data = request.body as UserCreateInput;
  const response = await registerService(data);
  reply.status(httpStatus.CREATED).send({
    message: 'Registration successful',
    data: response,
  })
});

export const googleLoginController = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(httpStatus.OK).send({ message: 'Login with google successful' });
});

export const githubLoginController = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(httpStatus.OK).send({ message: 'Login with github successful' });
});

export const verifyEmailController = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(httpStatus.OK).send({ message: 'Email verification logic to be implemented' });
});

export const forgotPasswordController = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(httpStatus.OK).send({ message: 'Email verification logic to be implemented' });
});

export const resetPasswordController = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(httpStatus.OK).send({ message: 'Email verification logic to be implemented' });
});
