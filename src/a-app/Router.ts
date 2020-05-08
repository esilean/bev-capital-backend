/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ConfigInterface } from '../e-infra/cross-cutting/utils/interfaces/config.interface'
import { Logger } from 'log4js'
import morgan from '../e-infra/cross-cutting/utils/logging/morgan'

import index from '../b-controllers'
import tokenController from '../b-controllers/token/token.controller'
import userController from '../b-controllers/user/user.controller'
import stockController from '../b-controllers/stock/stock.controller'


export default (
    config: ConfigInterface,
    logger: Logger,
    container: any,
    errorHandler: any
): Router => {
    const router = Router()

    if (config.env !== 'test') {
        router.use(morgan(logger))
    }

    const apiRouter = Router()
    apiRouter.use(cors())
    apiRouter.use(compression())
    apiRouter.use(bodyParser.json())
    apiRouter.use(container)

    apiRouter.use('/', index())
    apiRouter.use('/token', tokenController())
    apiRouter.use('/users', userController())
    apiRouter.use('/stocks', stockController())

    router.use('/api', apiRouter)

    router.use(errorHandler)
    return router
}
