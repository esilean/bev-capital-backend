import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'

import {
    RequestInterface,
    ResponseInterface,
    NextInterface,
} from '../../e-infra/cross-cutting/utils/interfaces/express.interface'
import { AuthInterface } from '../../e-infra/cross-cutting/authentication/interfaces/auth.interface'
import Stock from '../../d-domain/entities/stock'
import {
    DestroyStockServiceInterface,
    GetAllStockServiceInterface,
    GetStockServiceInterface,
    CreateStockServiceInterface,
} from '../../c-services/interfaces/stock.service.interface'

function stockController(
    auth: AuthInterface,
    getAllStockService: GetAllStockServiceInterface,
    getStockService: GetStockServiceInterface,
    createStockService: CreateStockServiceInterface,
    destroyStockService: DestroyStockServiceInterface
): unknown {
    return {
        authenticate: auth.authenticate(),
        getAll: (request: RequestInterface<Stock>, response: ResponseInterface, next: NextInterface): void => {
            const { SUCCESS, ERROR } = getAllStockService.getEventType()

            getAllStockService
                .on(SUCCESS, (stocks: Stock[]) => {
                    response.status(Status.OK).json(stocks)
                })
                .on(ERROR, next)

            getAllStockService.execute()
        },
        get: (request: RequestInterface<Stock>, response: ResponseInterface, next: NextInterface): void => {
            const { SUCCESS, ERROR, NOT_FOUND } = getStockService.getEventType()

            getStockService
                .on(SUCCESS, (stock: Stock) => {
                    response.status(Status.OK).json(stock)
                })
                .on(NOT_FOUND, (error: Error) => {
                    response.status(Status.NOT_FOUND).json(error)
                })
                .on(ERROR, next)

            const { symbol } = request.params
            getStockService.execute(symbol)
        },
        create: (request: RequestInterface<Stock>, response: ResponseInterface, next: NextInterface): void => {
            const { SUCCESS, ERROR, VALIDATION_ERROR } = createStockService.getEventType()

            createStockService
                .on(SUCCESS, (stock: Stock) => {
                    response.status(Status.CREATED).json(stock)
                })
                .on(VALIDATION_ERROR, (error: Error) => {
                    response.status(Status.BAD_REQUEST).json(error)
                })
                .on(ERROR, next)

            const { body } = request
            createStockService.execute(body)
        },

        delete: (request: RequestInterface<Stock>, response: ResponseInterface, next: NextInterface): void => {
            const { SUCCESS, ERROR, NOT_FOUND, VALIDATION_ERROR } = destroyStockService.getEventType()

            destroyStockService
                .on(SUCCESS, () => {
                    response.status(Status.NO_CONTENT).json()
                })
                .on(VALIDATION_ERROR, (error: Error) => {
                    response.status(Status.BAD_REQUEST).json(error)
                })
                .on(NOT_FOUND, () => {
                    response.status(Status.NOT_FOUND).json({
                        type: 'NotFoundError',
                        message: 'Stock cannot be found.',
                    })
                })
                .on(ERROR, next)

            const { id } = request.params
            destroyStockService.execute(id)
        },
    }
}

export default (): Router => {
    const router = Router()

    const api = makeInvoker(stockController)

    router.get('/', api('authenticate'), api('getAll'))
    router.get('/:symbol', api('authenticate'), api('get'))
    router.post('/', api('authenticate'), api('create'))
    router.delete('/:id', api('authenticate'), api('delete'))

    return router
}
