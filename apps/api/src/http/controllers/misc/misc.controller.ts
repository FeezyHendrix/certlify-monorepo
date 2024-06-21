import httpStatus from 'http-status';
import { get, post, SuccessResponse } from '../../../internal/http';
import { Industries, OccupationList } from '../../../internal/const';
import { ResendOtpValidations } from './validations/resend-otp.schema';
import { Redis } from 'ioredis';
import { HttpException } from '../../../internal/errors';
import { MailService } from '@sendgrid/mail';
import { Otp } from '../../../modules/otp';
import { AppEnv, DURATION } from '../../../internal/enums';
import { env } from '../../../config/env';

export const industryList = get('/industry/list', (ctx, request, reply) => {
  reply.status(httpStatus.OK).send(new SuccessResponse({ data: Industries }));
});

export const occupationList = get('/occupation/list', (ctx, request, reply) => {
  reply
    .status(httpStatus.OK)
    .send(new SuccessResponse({ data: OccupationList }));
});

export const resendOtp = post(
  '/otp/resend',
  { schema: { body: ResendOtpValidations.schema } },
  async (ctx, request, reply) => {
    const payload = <ResendOtpValidations>request.body;

    const redisCache = <Redis>ctx.redisCache;
    const sendGridMail = <MailService>ctx.sendGridMail;
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

    // TODO: move this to job queue
    sendGridMail
      .send({
        to: metadata.email,
        from: env.SENDGRID_SENDER,
        subject: 'Verify your email',
        html: `<p>your verification otp is ${otp}. it expires in 5 minutes</p>`,
      })
      .catch((err) => {
        ctx.log.error(err);
      });

    if (env.NODE_ENV != AppEnv.PRODUCTION) {
      reply.header('preview_otp', otp);
    }

    reply.status(httpStatus.OK).send(new SuccessResponse());
  }
);
