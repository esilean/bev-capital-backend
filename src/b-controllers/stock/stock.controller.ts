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
import Stock from '../../d-domain/entities/stock'
import {
  DestroyStockServiceInterface,
  GetAllStockServiceInterface,
  GetStockServiceInterface,
  CreateStockServiceInterface,
} from '../../c-services/interfaces/stock.service.interface'
import { ValidationError } from '../../e-infra/cross-cutting/utils/errors/error.handler'

function stockController(
  auth: AuthInterface,
  getAllStockService: GetAllStockServiceInterface,
  getStockService: GetStockServiceInterface,
  createStockService: CreateStockServiceInterface,
  destroyStockService: DestroyStockServiceInterface
): unknown {
  return {
    authenticate: auth.authenticate(),
    getAll: async (request: RequestInterface<Stock>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const stocksFound = await getAllStockService.execute()

        const stocks = stocksFound.map((stock: Stock) => {
          const { symbol, name, exchange, website } = stock
          return { symbol, name, exchange, website }
        })
        response.status(Status.OK).json(stocks)
      } catch (error) {
        next(error)
      }
    },
    get: async (request: RequestInterface<Stock>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { symbol } = request.params
        const stock = await getStockService.execute(symbol)
        const { name, exchange, website } = stock
        response.status(Status.OK).json({ symbol, name, exchange, website })
      } catch (error) {
        if (error.name === 'NotFoundError') response.status(Status.NOT_FOUND).json(error)
        else next(error)
      }
    },
    create: async (request: RequestInterface<Stock>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { body } = request
        const stock = await createStockService.execute(body)

        const { symbol, name, exchange, website } = stock
        response.status(Status.CREATED).json({ symbol, name, exchange, website })
      } catch (error) {
        if (error.name === 'ValidationError') response.status(Status.BAD_REQUEST).json(error)
        else if (error.name === 'NotFoundError') response.status(Status.NOT_FOUND).json(error)
        else next(error)
      }
    },

    delete: async (request: RequestInterface<Stock>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { symbol } = request.params
        const destroyed = await destroyStockService.execute(symbol)

        if (destroyed) response.status(Status.NO_CONTENT).json()
        else
          response.status(Status.NOT_FOUND).json({
            type: 'NotFoundError',
            message: 'Stock cannot be found.',
          })
      } catch (error) {
        if (error.name === 'ValidationError') response.status(Status.BAD_REQUEST).json(error)
        else next(error)
      }
    },
  }
}

export default (): Router => {
  const router = Router()

  const api = makeInvoker(stockController)

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
        symbol: Joi.string()
          .required()
          .max(20)
          .error(new ValidationError('Symbol is required and must be less or equal to 20 characters')),
        name: Joi.string().required().max(50),
        exchange: Joi.string().required().max(100),
        website: Joi.string().required().max(150),
      }),
    }),
    api('create')
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
