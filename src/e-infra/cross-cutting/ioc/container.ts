import {
    createContainer,
    InjectionMode,
    asClass,
    asFunction,
    asValue,
    Lifetime,
} from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { CradleInterface } from './interfaces/CradleInterface'
import { App } from '../../../a-app/App'
import { Server } from '../../../a-app/Server'
import Router from '../../../a-app/Router'
import { config } from '../configs/config'
import { logger } from '../utils/logging/logger'
import errorHandler from '../utils/errors/errorHandler'
import database from '../../data/sequelize'
import Auth from '../authentication/Auth'
import Jwt from '../authentication/Jwt'

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
    errorHandler: asValue(errorHandler),
    database: asFunction(database).singleton(),
    auth: asClass(Auth).singleton(),
    jwt: asClass(Jwt).singleton(),
})

container.loadModules([['../../data/models/**/*.*', { register: asValue }]], {
    cwd: __dirname,
    formatName: 'camelCase',
})

container.loadModules(
    [
        [
            '../../data/repositories/**/*.*',
            { register: asClass, lifetime: Lifetime.SINGLETON },
        ],
    ],
    {
        cwd: __dirname,
        formatName: 'camelCase',
    }
)

container.loadModules(
    [
        [
            '../../../d-domain/services/**/*.*',
            { register: asClass, lifetime: Lifetime.SINGLETON },
        ],
    ],
    {
        cwd: __dirname,
        formatName: 'camelCase',
    }
)


container.loadModules([['../../../c-services/services/**/*.*', { register: asClass }]], {
    cwd: __dirname,
    formatName: 'camelCase',
})

export { container }
