import { Request, Router } from 'express'
import { AppInterface } from '../../../../a-app/interfaces/AppInterface'
import { ServerInterface } from '../../../../a-app/interfaces/ServerInterface'
import { ConfigInterface } from '../../utils/interfaces/ConfigInterface'
import { Logger } from 'log4js'
import { Sequelize } from 'sequelize/types'
import {
    AuthInterface,
    JwtInterface,
} from '../../authentication/interfaces/AuthInterface'

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
}
