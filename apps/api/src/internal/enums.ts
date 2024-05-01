export enum AppEnv {
  PRODUCTION = 'production',
  STAGING = 'staging',
  TESTING = 'testing',
  DEVELOPMENT = 'development',
}

export enum DURATION {
  SECONDS = 1_000,
  MINUTES = 60 * SECONDS,
  HOURS = 60 * MINUTES,
  DAYS = 24 * HOURS,
}
