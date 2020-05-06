import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'

import {
    GetAllUserServiceInterface,
    CreateUserServiceInterface,
    DestroyUserServiceInterface,
} from '../../c-services/interfaces/UserServiceInterface'
import {
    RequestInterface,
    ResponseInterface,
    NextInterface,
} from '../../e-infra/cross-cutting/utils/interfaces/ExpressInterface'
import User from '../../d-domain/entities/User'

function userController(
    getAllUserService: GetAllUserServiceInterface,
    createUserService: CreateUserServiceInterface,
    destroyUserService: DestroyUserServiceInterface
): unknown {
    return {
        getAll: (
            request: RequestInterface<User>,
            response: ResponseInterface,
            next: NextInterface
        ): void => {
            const { SUCCESS, ERROR } = getAllUserService.getEventType()

            getAllUserService
                .on(SUCCESS, (users: User[]) => {
                    response.status(Status.OK).json(users)
                })
                .on(ERROR, next)

            getAllUserService.execute()
        },
        create: (
            request: RequestInterface<User>,
            response: ResponseInterface,
            next: NextInterface
        ): void => {
            const {
                SUCCESS,
                ERROR,
                VALIDATION_ERROR,
            } = createUserService.getEventType()

            createUserService
                .on(SUCCESS, (user: User) => {
                    response.status(Status.OK).json(user)
                })
                .on(VALIDATION_ERROR, (error: Error) => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'ValidationError',
                        message: error,
                    })
                })
                .on(ERROR, next)

            const { body } = request
            createUserService.execute(body)
        },

        delete: (
            request: RequestInterface<User>,
            response: ResponseInterface,
            next: NextInterface
        ): void => {
            const {
                SUCCESS,
                ERROR,
                NOT_FOUND,
            } = destroyUserService.getEventType()

            destroyUserService
                .on(SUCCESS, () => {
                    response.status(Status.NO_CONTENT).json()
                })
                .on(NOT_FOUND, () => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'NotFoundError',
                        message: 'User cannot be found.',
                    })
                })
                .on(ERROR, next)

            const { id } = request.params
            destroyUserService.execute(id)
        },
    }
}

export default (): Router => {
    const router = Router()

    const api = makeInvoker(userController)

    router.get('/', api('getAll'))
    router.post('/', api('create'))
    router.delete('/:id', api('delete'))

    return router
}
