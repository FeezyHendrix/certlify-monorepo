import { PrismaClient } from '@prisma/client';

export let DAL: PrismaClient;

export function initDBClient(client: PrismaClient) {
  DAL = client;
}
