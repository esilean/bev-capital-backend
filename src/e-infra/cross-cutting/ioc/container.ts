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
import errorHandler from '../utils/errors/errorHandler'
import database from '../../data/sequelize'

import { UserModel } from '../../data/models/user/UserModel'
import { UserRepository } from '../../data/repositories/user/UserRepository'
import { GetAllUserService } from '../../../c-services/user/GetAllUserService'
import { CreateUserService } from '../../../c-services/user/CreateUserService'
import { DestroyUserService } from '../../../c-services/user/DestroyUserService'

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

    userModel: asValue(UserModel),
    userRepository: asClass(UserRepository).singleton(),

    getAllUserService: asClass(GetAllUserService),
    createUserService: asClass(CreateUserService),
    destroyUserService: asClass(DestroyUserService),
})

export { container }
