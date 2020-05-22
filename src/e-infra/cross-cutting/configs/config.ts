import path from 'path'
import { ConfigInterface } from '../utils/interfaces/config.interface'
import dbConfig from './db/database'
import redisConfig from './db/redis'

export const configs = (env: string): ConfigInterface => {
  const logPath = path.join(__dirname, `../../../../logs/${env.toLowerCase()}.log`)

  let db: object
  let redis: object
  switch (env) {
    case 'development':
      db = dbConfig.development
      redis = redisConfig.development
      break
    case 'test':
      db = dbConfig.test
      redis = redisConfig.test
      break
    case 'production':
      db = dbConfig.production
      redis = redisConfig.production
      break
    default:
      db = dbConfig.development
      redis = redisConfig.development
  }

  const config: ConfigInterface = {
    env: env,
    db: db,
    redis: redis,
    port: process.env.PORT || 3000,
    logging: {
      appenders: {
        toFile: {
          type: 'file',
          filename: logPath,
        },
        toConsole: {
          type: 'console',
        },
      },
      categories: {
        default: { appenders: ['toFile', 'toConsole'], level: 'DEBUG' },
      },
    },
    authSecret: process.env.SECRET,
    //MARKET_TIME- miliseconds
    marketOpen: process.env.MARKET_OPEN_HHMMSS || '08:55:55',
    marketClose: process.env.MARKET_CLOSE_HHMMSS || '18:30:01',

    provider: process.env.PROVIDER || 'finnhub',
    //FINNHUB
    finnHubBaseURL: process.env.FINNHUB_BASEURL,
    finnHubToken: process.env.FINNHUB_TOKEN,
    //IEX
    iexBaseURL: process.env.IEX_BASEURL,
    iexToken: process.env.IEX_TOKEN,
    //INTERVALS
    intervalSecCacheRedis: process.env.INTERVAL_SEC_CACHEREDIS || '3600',
    intervalSecSendClient: process.env.INTERVAL_SEC_SENDCLIENT || '3600',
    //IEX
    intervalSecGetFromIex: process.env.INTERVAL_SEC_GETFROMIEX || '3600',
    //Finnhub
    intervalSecGetFromFinnhub: process.env.INTERVAL_SEC_GETFROMFINNHUB || '3600',
  }

  return config
}
