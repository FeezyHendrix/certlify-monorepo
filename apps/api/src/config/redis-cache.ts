import { FastifyBaseLogger } from 'fastify';
import { Redis } from 'ioredis';
import { env } from './env';

export async function configureRedisCache(
  logger: FastifyBaseLogger
): Promise<Redis> {
  const redis = new Redis(env.REDIS_URL);

  return new Promise<Redis>((resolve, reject) => {
    redis.on('connect', () => {
      logger.info('connected to redis');
      resolve(redis);
    });

    redis.on('error', (err) => {
      logger.error(err);
      reject(err);
    });
  });
}
