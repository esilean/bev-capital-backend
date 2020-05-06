import {
    createContainer,
    InjectionMode,
    asClass,
    asFunction,
    asValue,
} from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { CradleInterface } from './interfaces/CradleInterface'
import { App } from '../../../a-app/App'
import { Server } from '../../../a-app/Server'
import Router from '../../../a-app/Router'
import { config } from '../utils/configs/config'
import { logger } from '../utils/logging/logger'
import database from '../../data/sequelize'

const container = createContainer<CradleInterface>({
    injectionMode: InjectionMode.CLASSIC,
})

container.register({
    application: asClass(App).singleton(),
    server: asClass(Server).singleton(),
    router: asFunction(Router).singleton(),
    container: asValue(scopePerRequest(container)),
    config: asValue(config),
    logger: asFunction(logger),
    database: asFunction(database).singleton()
})

export { container }
