import path from 'path'
import { ConfigInterface } from '../../utils/interfaces/config.interface'
import dbConfig from './database'

export const configs = (env: string): ConfigInterface => {
  const logPath = path.join(__dirname, `../../../../../logs/${env.toLowerCase()}.log`)

  let db: object
  switch (env) {
    case 'development':
      db = dbConfig.development
      break
    case 'test':
      db = dbConfig.test
      break
    case 'production':
      db = dbConfig.production
      break
    default:
      db = dbConfig.development
  }

  const config: ConfigInterface = {
    env: env,
    db: db,
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
  }

  return config
}
