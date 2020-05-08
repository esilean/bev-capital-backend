import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'
import {
    RequestInterface,
    ResponseInterface,
    NextInterface,
} from '../../e-infra/cross-cutting/utils/interfaces/express.interface'

import {
    GetUserStockServiceInterface,
    CreateUserStockServiceInterface,
    DestroyUserStockServiceInterface,
} from '../../c-services/interfaces/user.stock.service.interface'

import { AuthInterface } from '../../e-infra/cross-cutting/authentication/interfaces/auth.interface'
import UserStock from '../../d-domain/entities/user.stock'

function userStockController(
    auth: AuthInterface,
    getUserStockService: GetUserStockServiceInterface,
    createUserStockService: CreateUserStockServiceInterface,
    destroyUserStockService: DestroyUserStockServiceInterface
): unknown {
    return {
        authenticate: auth.authenticate(),
        get: (request: RequestInterface<UserStock>, response: ResponseInterface, next: NextInterface): void => {
            const { SUCCESS, ERROR, NOT_FOUND } = getUserStockService.getEventType()

            getUserStockService
                .on(SUCCESS, (userStock: UserStock) => {
                    response.status(Status.OK).json(userStock)
                })
                .on(NOT_FOUND, (error: Error) => {
                    response.status(Status.NOT_FOUND).json(error)
                })
                .on(ERROR, next)

            const { id } = request.params
            getUserStockService.execute(id)
        },
        create: (request: RequestInterface<UserStock>, response: ResponseInterface, next: NextInterface): void => {
            const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = createUserStockService.getEventType()

            createUserStockService
                .on(SUCCESS, (userStock: UserStock) => {
                    response.status(Status.CREATED).json(userStock)
                })
                .on(VALIDATION_ERROR, (error: Error) => {
                    response.status(Status.BAD_REQUEST).json(error)
                })
                .on(NOT_FOUND, (error: Error) => {
                    response.status(Status.NOT_FOUND).json(error)
                })
                .on(ERROR, next)

            const { id } = request.user
            const { body } = request
            createUserStockService.execute(id, body)
        },

        delete: (request: RequestInterface<UserStock>, response: ResponseInterface, next: NextInterface): void => {
            const { SUCCESS, ERROR, NOT_FOUND } = destroyUserStockService.getEventType()

            destroyUserStockService
                .on(SUCCESS, () => {
                    response.status(Status.NO_CONTENT).json()
                })
                .on(NOT_FOUND, () => {
                    response.status(Status.NOT_FOUND).json({
                        type: 'NotFoundError',
                        message: 'User Stock cannot be found.',
                    })
                })
                .on(ERROR, next)

            const { id } = request.user
            const { symbol } = request.params
            destroyUserStockService.execute(id, symbol)
        },
    }
}

export default (): Router => {
    const router = Router()

    const api = makeInvoker(userStockController)

    router.get('/stock/:id', api('authenticate'), api('get'))
    router.post('/stock', api('authenticate'), api('create'))
    router.delete('/stock/:symbol', api('authenticate'), api('delete'))

    return router
}
