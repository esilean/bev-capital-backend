import { Request, Router } from 'express'
import { AppInterface } from '../../../../a-app/interfaces/app.interface'
import { ServerInterface } from '../../../../a-app/interfaces/server.interface'
import { ConfigInterface } from '../../utils/interfaces/config.interface'
import { Logger } from 'log4js'
import { Sequelize } from 'sequelize/types'
import { AuthInterface, JwtInterface } from '../../authentication/interfaces/auth.interface'
import { SocketIOInterface } from '../../../../a-app/socket'

export interface CradleInterface extends Request {
  server: ServerInterface
  application: AppInterface
  router: Router
  container: unknown
  config: ConfigInterface
  logger: Logger
  errorHandler: void
  database: Sequelize
  auth: AuthInterface
  jwt: JwtInterface
  sockio: SocketIOInterface
}
