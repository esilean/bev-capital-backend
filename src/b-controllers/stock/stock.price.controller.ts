import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'
import { celebrate, Segments, Joi } from 'celebrate'
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
  GetStockPriceServiceInterface,
} from '../../c-services/interfaces/stock.price.service.interface'
import StockPrice from '../../d-domain/entities/stock.prices'

function stockPriceController(
  auth: AuthInterface,
  getAllStockPriceService: GetAllStockPriceServiceInterface,
  getStockPriceService: GetStockPriceServiceInterface,
  createStockPriceService: CreateStockPriceServiceInterface,
  updateStockPriceService: UpdateStockPriceServiceInterface,
  destroyStockPriceService: DestroyStockPriceServiceInterface
): unknown {
  return {
    authenticate: auth.authenticate(),
    getAll: async (request: RequestInterface<StockPrice>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const stockPricesFound = await getAllStockPriceService.execute()
        const stockPrices = stockPricesFound.map((stockPrice: StockPrice) => {
          const {
            symbol,
            open,
            close,
            high,
            low,
            latestPrice,
            latestPriceTime,
            delayedPrice,
            delayedPriceTime,
            previousClosePrice,
          } = stockPrice
          return {
            symbol,
            open,
            close,
            high,
            low,
            latestPrice,
            latestPriceTime,
            delayedPrice,
            delayedPriceTime,
            previousClosePrice,
          }
        })

        response.status(Status.OK).json(stockPrices)
      } catch (error) {
        next(error)
      }
    },
    get: async (request: RequestInterface<StockPrice>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { symbol } = request.params
        const stockPrice = await getStockPriceService.execute(symbol)

        const {
          open,
          close,
          high,
          low,
          latestPrice,
          latestPriceTime,
          delayedPrice,
          delayedPriceTime,
          previousClosePrice,
        } = stockPrice

        response.status(Status.OK).json({
          symbol,
          open,
          close,
          high,
          low,
          latestPrice,
          latestPriceTime,
          delayedPrice,
          delayedPriceTime,
          previousClosePrice,
        })
      } catch (error) {
        if (error.name === 'NotFoundError') response.status(Status.NOT_FOUND).json(error)
        else next(error)
      }
    },
    create: async (request: RequestInterface<StockPrice>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { body } = request
        const stockPrice = await createStockPriceService.execute(body)
        const {
          symbol,
          open,
          close,
          high,
          low,
          latestPrice,
          latestPriceTime,
          delayedPrice,
          delayedPriceTime,
          previousClosePrice,
        } = stockPrice

        response.status(Status.CREATED).json({
          symbol,
          open,
          close,
          high,
          low,
          latestPrice,
          latestPriceTime,
          delayedPrice,
          delayedPriceTime,
          previousClosePrice,
        })
      } catch (error) {
        if (error.name === 'ValidationError') response.status(Status.BAD_REQUEST).json(error)
        else if (error.name === 'NotFoundError') response.status(Status.NOT_FOUND).json(error)
        else next(error)
      }
    },

    update: async (request: RequestInterface<StockPrice>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { symbol } = request.params
        const { body } = request
        const stockPrice = await updateStockPriceService.execute(symbol, body)
        const {
          open,
          close,
          high,
          low,
          latestPrice,
          latestPriceTime,
          delayedPrice,
          delayedPriceTime,
          previousClosePrice,
        } = stockPrice

        response.status(Status.OK).json({
          symbol,
          open,
          close,
          high,
          low,
          latestPrice,
          latestPriceTime,
          delayedPrice,
          delayedPriceTime,
          previousClosePrice,
        })
      } catch (error) {
        if (error.name === 'ValidationError') response.status(Status.BAD_REQUEST).json(error)
        else if (error.name === 'NotFoundError') response.status(Status.NOT_FOUND).json(error)
        else next(error)
      }
    },

    delete: async (request: RequestInterface<StockPrice>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { symbol } = request.params
        const destroyed = await destroyStockPriceService.execute(symbol)

        if (destroyed) response.status(Status.NO_CONTENT).json()
        else
          response.status(Status.NOT_FOUND).json({
            type: 'NotFoundError',
            message: 'Stock Price cannot be found.',
          })
      } catch (error) {
        next(error)
      }
    },
  }
}

export default (): Router => {
  const router = Router()

  const api = makeInvoker(stockPriceController)

  router.get('/', api('authenticate'), api('getAll'))
  router.get(
    '/:symbol',
    api('authenticate'),
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        symbol: Joi.string().required().max(20),
      }),
    }),
    api('get')
  )
  router.post(
    '/',
    api('authenticate'),
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        symbol: Joi.string().required().max(20),
        open: Joi.number().required(),
        close: Joi.number().required(),
        high: Joi.number().required(),
        low: Joi.number().required(),
        latestPrice: Joi.number().required(),
        latestPriceTime: Joi.date().required(),
        delayedPrice: Joi.number().required(),
        delayedPriceTime: Joi.date().required(),
        previousClosePrice: Joi.number().required(),
      }),
    }),
    api('create')
  )
  router.put(
    '/:symbol/',
    api('authenticate'),
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        symbol: Joi.string().required().max(20),
      }),
      [Segments.BODY]: Joi.object().keys({
        open: Joi.number().required(),
        close: Joi.number().required(),
        high: Joi.number().required(),
        low: Joi.number().required(),
        latestPrice: Joi.number().required(),
        latestPriceTime: Joi.date().required(),
        delayedPrice: Joi.number().required(),
        delayedPriceTime: Joi.date().required(),
        previousClosePrice: Joi.number().required(),
      }),
    }),
    api('update')
  )
  router.delete(
    '/:symbol',
    api('authenticate'),
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        symbol: Joi.string().required().max(20),
      }),
    }),
    api('delete')
  )

  return router
}
