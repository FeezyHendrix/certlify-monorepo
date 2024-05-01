import envSchema from 'env-schema';
import { S } from 'fluent-json-schema';
import { AppEnv } from '../internal/enums';

export type Env = Record<string, any> & {
  PORT: number;
  HOST: string;
  NODE_ENV: AppEnv;
  TOKEN_STORE_SECRET: string;
  REDIS_URL: string;
  SENDGRID_API_KEY: string;
  SENDGRID_SENDER: string;
};

export const env: Readonly<Env> = <Env>{};

const schema: any = S.object()
  .prop('PORT', S.number().default(9999).required())
  .prop(
    'NODE_ENV',
    S.enum(Object.values(AppEnv)).default(AppEnv.DEVELOPMENT).required()
  )
  .prop('HOST', S.string().default('0.0.0.0').required())
  .prop('TOKEN_STORE_SECRET', S.string().required())
  .prop('REDIS_URL', S.string().required())
  .prop('SENDGRID_API_KEY', S.string().required())
  .prop('SENDGRID_SENDER', S.string().required());

export function loadEnv() {
  const config = envSchema({
    schema,
    dotenv: true,
    expandEnv: true,
  });

  Object.assign(env, process.env, config);
  Object.freeze(env);
}
