/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
module.exports = {
  development: {
    url: process.env.REDIS_URL_DEVWIN,
    //host: '127.0.0.1',
    //port: '6379',
  },
  test: {
    //url: process.env.REDIS_URL_DEVWIN,
    host: '127.0.0.1',
    port: '6379',
  },
  production: {
    url: process.env.REDIS_URL,
  },
}
