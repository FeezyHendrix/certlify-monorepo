import { Queue, Worker } from 'bullmq';
import { jobs, appendQueue, appendWorker, getQueue } from '../internal/bull';
import { FastifyInstance } from 'fastify';
import { Redis } from 'ioredis';
import { merge } from 'lodash';
import { JobDependencies } from '../mq/bull/jobs';

export function initBull(
  app: FastifyInstance & Record<string, any>,
  connectionUrl: string
) {
  const redis = new Redis(connectionUrl, { maxRetriesPerRequest: null });

  const deps: JobDependencies = {
    sendGrid: app.sendGridMail,
    logger: app.log,
  };

  for (const job of jobs) {
    job.opt.queueOptions = merge(job.opt.queueOptions ?? {}, {
      connection: redis,
    });

    job.opt.workerOptions = merge(job.opt.workerOptions ?? {}, {
      connection: redis,
    });

    const queue = new Queue(job.name, job.opt.queueOptions);

    appendQueue(job.name, queue);

    const worker = new Worker(
      job.name,
      job.processorFactory(deps),
      job.opt.workerOptions
    );

    appendWorker(job.name, worker);
  }

  app.decorate('getQueue', getQueue);

  deps.logger.info('initialized bullMQ');
}
