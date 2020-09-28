module.exports = {
  apps: [
    {
      name: 'see-api',
      script: 'serve -s build',
      env: {
        NODE_ENV: 'development',
      },
      env_test: {
        NODE_ENV: 'test',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
        APP_URL: 'http://134.122.56.46:3333',
        APP_SECRET: 'anythingsafehereatall',

        DB_HOST: 'localhost',
        DB_USER: 'see',
        DB_PASS: 'trabalho',
        DB_NAME: 'see',
        DB_PORT: 5433,
        SENTRY_DSN:
          'https://8f8964baced84cb289eb7a31ccabacea@o350016.ingest.sentry.io/5241300',
      },
    },
  ],
};
