import { Request, Router } from 'express'
import { AppInterface } from '../../../../a-app/interfaces/AppInterface'
import { ServerInterface } from '../../../../a-app/interfaces/ServerInterface'
import { ConfigInterface } from '../../utils/interfaces/ConfigInterface'
import { Logger } from 'log4js'
import { Sequelize } from 'sequelize/types'

import { UserModelInterface } from '../../../data/models/user/UserModel'
import { UserRepositoryInterface } from '../../../data/interfaces/UserRepositoryInterface'
import {
    GetAllUserServiceInterface,
    CreateUserServiceInterface,
    DestroyUserServiceInterface,
} from '../../../../c-services/interfaces/UserServiceInterface'

export interface CradleInterface extends Request {
    server: ServerInterface
    application: AppInterface
    router: Router
    container: unknown
    config: ConfigInterface
    logger: Logger
    errorHandler: void
    database: Sequelize

    userModel: UserModelInterface
    userRepository: UserRepositoryInterface
    getAllUserService: GetAllUserServiceInterface
    createUserService: CreateUserServiceInterface
    destroyUserService: DestroyUserServiceInterface
}
