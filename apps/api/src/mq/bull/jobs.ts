import { MailService } from '@sendgrid/mail';
import { createJob } from '../../internal/bull';
import { env } from '../../config/env';
import { FastifyBaseLogger } from 'fastify';

export type JobDependencies = {
  sendGrid: MailService;
  logger: FastifyBaseLogger;
};

export type SendEmailJob = {
  to: string;
  subject: string;
  body: string;
};

export const sendEmailJob = createJob<SendEmailJob>(
  'email',
  ({ sendGrid, logger }: JobDependencies) => {
    return async (job) => {
      try {
        const { to, subject, body } = job.data;

        const res = await sendGrid.send({
          to,
          from: env.SENDGRID_SENDER,
          subject,
          html: body,
        });

        res.forEach((r) => {
          logger.info(r);
        });
      } catch (error) {
        logger.error(error);
        throw error;
      }
    };
  }
);
