import { PrismaClient } from '@prisma/client';
import { FastifyBaseLogger } from 'fastify';

export async function configureDB(
  logger: FastifyBaseLogger
): Promise<PrismaClient> {
  const prismaClient = new PrismaClient();

  await prismaClient.$connect();

  logger.info('connected to database');

  return prismaClient;
}
