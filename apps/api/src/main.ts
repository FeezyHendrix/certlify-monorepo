import { initDBClient } from './internal/db';
import { configureDB } from './config/db';
import { loadEnv, env } from './config/env';
import { App } from './app';
import { configureRedisCache } from './config/redis-cache';
import { TokenStore } from './internal/token-store';
import { MailService } from '@sendgrid/mail';
import { Otp } from './modules/otp';
import { TokenAuth } from './modules/token-auth';
import { initBull } from './config/bull';
import './mq/bull/jobs';

async function main() {
  loadEnv();

  const app = App({ logger: true });

  const db = await configureDB(app.log);

  initDBClient(db);

  const redisCache = await configureRedisCache(app.log);

  const tokenStore = new TokenStore(env.TOKEN_STORE_SECRET, redisCache);
  const tokenAuth = new TokenAuth(tokenStore);

  app.decorate('redisCache', redisCache);
  app.decorate('tokenAuth', tokenAuth);

  const mailService = new MailService();
  mailService.setApiKey(env.SENDGRID_API_KEY);

  app.decorate('sendGridMail', mailService);

  app.decorate('otpUtil', new Otp(redisCache));

  initBull(app, env.REDIS_URL);

  app.listen({ port: env.PORT, host: env.HOST }, (err) => {
    if (err != null) {
      app.log.error(err);
      process.exit(1);
    }
  });
}

main();
