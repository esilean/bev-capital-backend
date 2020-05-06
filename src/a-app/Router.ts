/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ConfigInterface } from '../e-infra/cross-cutting/utils/interfaces/ConfigInterface'
import { Logger } from 'log4js'
import morgan from '../e-infra/cross-cutting/utils/logging/morgan'

export default (
    config: ConfigInterface,
    logger: Logger,
    container: any
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

    router.use('/api', router)
    return router
}
