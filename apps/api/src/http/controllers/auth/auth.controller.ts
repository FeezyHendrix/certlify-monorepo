import { routePrefix } from '../../../utils/route-prefix';
import { get, post, SuccessResponse } from '../../../internal/http';
import { EmailAuthValidation } from './validations/email-auth.schema';
import { Redis } from 'ioredis';
import { ulid } from 'ulid';
import { hashPassword, verifyPassword } from '../../../utils/bcrypt-utils';
import { AppEnv, DURATION } from '../../../internal/enums';
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from '../../../services/user/user.service';
import { HttpException } from '../../../internal/errors';
import httpStatus from 'http-status';
import { env } from '../../../config/env';
import { Otp } from '../../../modules/otp';
import { OtpValidation } from './validations/otp.schema';
import { CompleteProfileValidation } from './validations/complete-profile.schema';
import { authPreHandler } from '../../pre-handlers/auth.handler';
import { AuthClaim } from '../../../internal/types';
import { otpFlowKey, OtpFlow, genOtpIdxKey } from '../../../utils/otp-flow';
import { prefixedKey } from '../../../utils/prefixed-key';
import { ForgotPasswordValidation } from './validations/forgot-password.schema';
import { MailService } from '@sendgrid/mail';
import { ResetPasswordValidation } from './validations/reset-password.schema';
import { TokenAuth } from '../../../modules/token-auth';

const authRoute = routePrefix('auth');

export const initiateSignup = post(
  authRoute('signup'),
  { schema: { body: EmailAuthValidation.schema }, preHandler: [] },
  async (ctx, request, reply) => {
    const redisCache = <Redis>ctx.redisCache;
    const sendGridMail = <MailService>ctx.sendGridMail;
    const otpUtil = <Otp>ctx.otpUtil;

    const payload = <EmailAuthValidation>request.body;

    const userWithEmail = await getUserByEmail(payload.email);

    if (userWithEmail != null) {
      throw new HttpException(
        httpStatus.BAD_REQUEST,
        'An account with this email already exists'
      );
    }

    const onboardingUserKey = prefixedKey('new_signup', payload.email);

    let onboardingUser = await redisCache
      .get(onboardingUserKey)
      .then((d) => JSON.parse(d));

    if (onboardingUser == null) {
      onboardingUser = {
        id: ulid(),
        email: payload.email,
        password: await hashPassword(payload.password),
      };

      await redisCache.set(
        onboardingUserKey,
        JSON.stringify(onboardingUser),
        'PX',
        DURATION.DAYS
      );
    }

    const otp = await otpUtil.generate({
      key: onboardingUser.id,
      length: 6,
      expiresIn: 5 * DURATION.MINUTES,
    });

    const flow_key = await genOtpIdxKey(OtpFlow.VERIFY_EMAIL, otp);

    await redisCache.set(
      flow_key,
      JSON.stringify({ email: payload.email }),
      'PX',
      15 * DURATION.MINUTES
    );

    // TODO: move this to job queue
    sendGridMail
      .send({
        to: payload.email,
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

    reply
      .status(httpStatus.OK)
      .send(new SuccessResponse({ data: { flow_key } }));
  }
);

export const verifySignUpEmail = post(
  authRoute('/signup/email/verify'),
  { schema: { body: OtpValidation.schema } },
  async (ctx, request, reply) => {
    const payload = <OtpValidation>request.body;
    const redisCache = <Redis>ctx.redisCache;
    const tokenAuth = <TokenAuth>ctx.TokenAuth;
    const otpUtil = <Otp>ctx.otpUtil;

    const key = await genOtpIdxKey(OtpFlow.VERIFY_EMAIL, payload.otp);

    const metadata = await redisCache.get(key).then((d) => JSON.parse(d));

    if (metadata?.email == null) {
      throw new HttpException(httpStatus.BAD_REQUEST, 'Invalid otp');
    }

    const otpKey = otpFlowKey(OtpFlow.VERIFY_EMAIL, metadata.email);

    const onboardingUser = await redisCache
      .get(otpKey)
      .then((d) => JSON.parse(d));

    await otpUtil.revoke(onboardingUser.id);

    const auth_token = await tokenAuth.generate({
      id: onboardingUser.id,
      email: metadata.email,
    });

    await redisCache.pexpire(otpKey, 5 * DURATION.MINUTES);

    reply
      .status(httpStatus.OK)
      .send(new SuccessResponse({ data: { auth_token } }));
  }
);

export const completeProfile = post(
  authRoute('signup/profile'),
  {
    schema: { body: CompleteProfileValidation.schema },
    preHandler: [authPreHandler],
  },
  async (ctx, request, reply) => {
    const authClaim = <AuthClaim>request.claim;
    const payload = <CompleteProfileValidation>request.body;

    const redisCache = <Redis>ctx.redisCache;

    const user = await getUserById(authClaim.id);

    if (user != null) {
      throw new HttpException(
        httpStatus.CONFLICT,
        'profile already complete, please login'
      );
    }

    const onboardingUserKey = prefixedKey('new_signup', authClaim.email);

    const onboardingUser = await redisCache
      .get(onboardingUserKey)
      .then((d) => JSON.parse(d));

    await createUser({
      id: onboardingUser.id,
      email: onboardingUser.email,
      password: onboardingUser.password,
      first_name: payload.first_name,
      last_name: payload.last_name,
      industry: payload.industry,
      occupation: payload.occupation,
    });

    reply.status(httpStatus.OK).send(new SuccessResponse());
  }
);

export const login = post(
  authRoute('login'),
  {
    schema: { body: EmailAuthValidation.schema },
  },
  async (ctx, request, reply) => {
    const tokenAuth = <TokenAuth>ctx.tokenAuth;

    const payload = <EmailAuthValidation>request.body;

    const user = await getUserByEmail(payload.email);

    if (user == null) {
      throw new HttpException(
        httpStatus.BAD_REQUEST,
        'incorrect email or password'
      );
    }

    const passwordMatch = await verifyPassword(payload.password, user.password);

    if (!passwordMatch) {
      throw new HttpException(
        httpStatus.BAD_REQUEST,
        'incorrect email or password'
      );
    }

    const auth_token = await tokenAuth.generate({
      id: user.id,
    });

    reply
      .status(httpStatus.OK)
      .send(new SuccessResponse({ data: { auth_token } }));
  }
);

export const forgotPassword = post(
  authRoute('forgot-password'),
  { schema: { body: ForgotPasswordValidation.schema } },
  async (ctx, request, reply) => {
    const redisCache = <Redis>ctx.redisCache;
    const otpUtil = <Otp>ctx.otpUtil;
    const sendGridMail = <MailService>ctx.sendGridMail;

    const payload = <ForgotPasswordValidation>request.body;

    const user = await getUserByEmail(payload.email);

    if (user == null) {
      throw new HttpException(
        httpStatus.NOT_FOUND,
        "we couldn't find your account"
      );
    }

    const otp = await otpUtil.generate({
      key: user.id,
      length: 6,
      expiresIn: 5 * DURATION.MINUTES,
    });

    // TODO: move this to job queue
    sendGridMail
      .send({
        to: payload.email,
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

    const flow_key = await genOtpIdxKey(OtpFlow.RESET_PASSWORD, otp);

    await redisCache.set(
      flow_key,
      JSON.stringify({ id: user.id, email: payload.email }),
      'PX',
      15 * DURATION.MINUTES
    );

    reply.status(httpStatus.OK).send(
      new SuccessResponse({
        message:
          'A verification email has been sent, you should recieve it shortly',
        data: { flow_key },
      })
    );
  }
);

export const resetPassword = post(
  authRoute('reset-password'),
  {
    schema: { body: ResetPasswordValidation.schema },
  },
  async (ctx, request, reply) => {
    const redisCache = <Redis>ctx.redisCache;

    const payload = <ResetPasswordValidation>request.body;

    const key = await genOtpIdxKey(OtpFlow.RESET_PASSWORD, payload.otp);

    const metadata = await redisCache.get(key).then((d) => JSON.parse(d));

    if (metadata == null) {
      throw new HttpException(httpStatus.BAD_REQUEST, 'Invalid otp');
    }

    await redisCache.del(key);

    const newPasswordHash = await hashPassword(payload.new_password);

    await updateUser(metadata.id, { password: newPasswordHash });

    reply.status(httpStatus.OK).send(new SuccessResponse());
  }
);

export const logout = get(
  authRoute('logout'),
  { preHandler: [authPreHandler] },
  async (ctx, request, reply) => {
    const tokenAuth = <TokenAuth>ctx.tokenAuth;

    const authClaimId = <string>request.claimId;

    await tokenAuth.revoke(authClaimId);

    reply.status(200).send(new SuccessResponse());
  }
);
