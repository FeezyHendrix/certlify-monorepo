import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

export function initDBClient(client: PrismaClient) {
  prismaClient = client;
}

export function DAL() {
  return prismaClient;
}
