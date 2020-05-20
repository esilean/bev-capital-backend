import redis from 'redis'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ConfigInterface {
  env: string
  db: Record<string, any>
  redis: redis.ClientOpts
  port: string | number
  logging: LogginInterface
  finnHubBaseURL: string | undefined
  finnHubToken: string | undefined

  iexBaseURL: string | undefined
  iexToken: string | undefined

  intervalSecSendClient: string
  intervalSecGetFromIex: string
  intervalSecCacheRedis: string
  authSecret: string | undefined
}

interface LogginInterface {
  appenders: Record<string, any>
  categories: Record<string, any>
}

export { ConfigInterface }
