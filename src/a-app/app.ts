import { AppInterface } from './interfaces/app.interface'
import { ServerInterface } from './interfaces/server.interface'
import { Logger } from 'log4js'
import { Sequelize } from 'sequelize/types'
import { RedisInterface } from '../e-infra/redis/interfaces/redis.interface'

export class App implements AppInterface {
  private logger: Logger
  private server: ServerInterface
  private database: Sequelize
  private redisClient: RedisInterface

  constructor(logger: Logger, server: ServerInterface, database: Sequelize, redisClient: RedisInterface) {
    this.logger = logger
    this.server = server
    this.database = database
    this.redisClient = redisClient
  }

  start(): void {
    try {
      this.database
        .authenticate()
        .then(() => {
          this.logger.info('DB connection has been established successfully.')
        })
        .catch((error) => {
          this.logger.error(`AppError: db.authenticate() ${error}`)
        })

      this.redisClient.redis().on('connect', () => {
        this.logger.info('Redis connection has been established successfully.')
      })

      this.redisClient.redis().on('error', (err) => {
        this.logger.error(`Redis error: ${err}`)
      })

      this.server.startServer()
    } catch (error) {
      this.logger.error(`AppError: startServer() ${error}`)
    }
  }
}
