import httpStatus from 'http-status';
import { get, post, SuccessResponse } from '../../../internal/http';
import { Industries, OccupationList } from '../../../internal/const';
import { ResendOtpValidations } from './validations/resend-otp.schema';
import { Redis } from 'ioredis';
import { HttpException } from '../../../internal/errors';
import { Otp } from '../../../modules/otp';
import { AppEnv, DURATION } from '../../../internal/enums';
import { env } from '../../../config/env';
import { getQueue } from 'apps/api/src/internal/bull';
import { SendEmailJob } from 'apps/api/src/mq/bull/jobs';

export const industryList = get('/industry/list', (_ctx, _request, reply) => {
  reply.status(httpStatus.OK).send(new SuccessResponse({ data: Industries }));
});

export const occupationList = get(
  '/occupation/list',
  (_ctx, _request, reply) => {
    reply
      .status(httpStatus.OK)
      .send(new SuccessResponse({ data: OccupationList }));
  }
);

export const resendOtp = post(
  '/otp/resend',
  { schema: { body: ResendOtpValidations.schema } },
  async (ctx, request, reply) => {
    const payload = <ResendOtpValidations>request.body;

    const redisCache = <Redis>ctx.redisCache;
    const emailQueue = (<typeof getQueue>ctx.getQueue)<SendEmailJob>('email');
    const otpUtil = <Otp>ctx.otpUtil;

    const metadata = await redisCache
      .get(payload.flow_key)
      .then((d) => JSON.parse(d));

    if (metadata == null) {
      throw new HttpException(
        httpStatus.GONE,
        'cannot not send otp at the moment, please try again later'
      );
    }

    const otp = await otpUtil.generate({
      key: metadata.id,
      length: 6,
      expiresIn: 5 * DURATION.MINUTES,
    });

    await emailQueue.add(
      'email',
      {
        to: metadata.email,
        subject: 'Verify your email',
        body: `<p>your verification otp is ${otp}. it expires in 5 minutes</p>`,
      },
      { attempts: 3, backoff: 2 * DURATION.SECONDS }
    );

    if (env.NODE_ENV != AppEnv.PRODUCTION) {
      reply.header('preview_otp', otp);
    }

    reply.status(httpStatus.OK).send(new SuccessResponse());
  }
);
