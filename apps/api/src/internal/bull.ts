import { Record } from '@prisma/client/runtime/library';
import { QueueOptions, WorkerOptions, Queue, Worker, Processor } from 'bullmq';

export type JobOption = Partial<{
  queueOptions: QueueOptions;
  workerOptions: WorkerOptions;
}>;

export type BullJobs<T = any, R = any> = {
  name: string;
  processorFactory: (dep: any) => Processor<T, R>;
  opt: JobOption;
};

export const jobs: BullJobs[] = [];

const queueTable: Record<string, Queue> = {};
const workerTable: Record<string, Worker> = {};

export const appendQueue = (name: string, queue: Queue) => {
  queueTable[name] = queue;
};

export const getQueue = <T = any, R = any>(name: string): Queue<T, R> => {
  return queueTable[name];
};

export const appendWorker = (name: string, worker: Worker) => {
  workerTable[name] = worker;
};

export const getWorker = <T = any, R = any>(name: string): Worker<T, R> => {
  return workerTable[name];
};

export const createJob = <DataType = any, ResultType = any>(
  name: string,
  processorFactory: (dep: any) => Processor<DataType, ResultType>,
  opt: JobOption = {}
) => {
  jobs.push({ name, processorFactory, opt });
};
