import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'
import {
  RequestInterface,
  ResponseInterface,
  NextInterface,
} from '../../e-infra/cross-cutting/utils/interfaces/express.interface'

import { AuthInterface } from '../../e-infra/cross-cutting/authentication/interfaces/auth.interface'
import {
  GetAllStockPriceServiceInterface,
  CreateStockPriceServiceInterface,
  UpdateStockPriceServiceInterface,
  DestroyStockPriceServiceInterface,
} from '../../c-services/interfaces/stock.price.service.interface'
import StockPrice from '../../d-domain/entities/stock.prices'

function stockPriceController(
  auth: AuthInterface,
  getAllStockPriceService: GetAllStockPriceServiceInterface,
  createStockPriceService: CreateStockPriceServiceInterface,
  updateStockPriceService: UpdateStockPriceServiceInterface,
  destroyStockPriceService: DestroyStockPriceServiceInterface
): unknown {
  return {
    authenticate: auth.authenticate(),
    getAll: (request: RequestInterface<StockPrice>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR } = getAllStockPriceService.getEventType()

      getAllStockPriceService
        .on(SUCCESS, (stockPrices: StockPrice[]) => {
          response.status(Status.OK).json(stockPrices)
        })
        .on(ERROR, next)

      getAllStockPriceService.execute()
    },
    create: (request: RequestInterface<StockPrice>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = createStockPriceService.getEventType()

      createStockPriceService
        .on(SUCCESS, (stockPrice: StockPrice) => {
          response.status(Status.CREATED).json(stockPrice)
        })
        .on(VALIDATION_ERROR, (error: Error) => {
          response.status(Status.BAD_REQUEST).json(error)
        })
        .on(NOT_FOUND, (error: Error) => {
          response.status(Status.NOT_FOUND).json(error)
        })
        .on(ERROR, next)

      const { body } = request

      createStockPriceService.execute(body)
    },

    update: (request: RequestInterface<StockPrice>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateStockPriceService.getEventType()

      updateStockPriceService
        .on(SUCCESS, (stockPrice: StockPrice) => {
          response.status(Status.OK).json(stockPrice)
        })
        .on(VALIDATION_ERROR, (error: Error) => {
          response.status(Status.BAD_REQUEST).json(error)
        })
        .on(NOT_FOUND, (error: Error) => {
          response.status(Status.NOT_FOUND).json(error)
        })
        .on(ERROR, next)

      const { symbol, dateprice } = request.params
      const { body } = request
      updateStockPriceService.execute(symbol, dateprice, body)
    },

    delete: (request: RequestInterface<StockPrice>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR, NOT_FOUND } = destroyStockPriceService.getEventType()

      destroyStockPriceService
        .on(SUCCESS, () => {
          response.status(Status.NO_CONTENT).json()
        })
        .on(NOT_FOUND, () => {
          response.status(Status.NOT_FOUND).json({
            type: 'NotFoundError',
            message: 'Stock Price cannot be found.',
          })
        })
        .on(ERROR, next)

      const { symbol, dateprice } = request.params
      destroyStockPriceService.execute(symbol, dateprice)
    },
  }
}

export default (): Router => {
  const router = Router()

  const api = makeInvoker(stockPriceController)

  router.get('/', api('authenticate'), api('getAll'))
  router.post('/', api('authenticate'), api('create'))
  router.put('/:symbol/:dateprice', api('authenticate'), api('update'))
  router.delete('/:symbol/:dateprice', api('authenticate'), api('delete'))

  return router
}
