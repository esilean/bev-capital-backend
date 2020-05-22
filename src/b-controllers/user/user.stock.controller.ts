import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'
import { celebrate, Segments, Joi } from 'celebrate'
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
    get: async (request: RequestInterface<UserStock>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { id } = request.params
        const userStock = await getUserStockService.execute(id)

        const { symbol, qty, avgPrice, stock } = userStock

        const { name, exchange, website, stockPrice } = stock

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
          changePercent,
        } = stockPrice

        const data = {
          id,
          symbol,
          qty,
          avgPrice,
          stock: {
            name,
            exchange,
            website,
            priceToday: {
              open,
              close,
              high,
              low,
              latestPrice,
              latestPriceTime,
              delayedPrice,
              delayedPriceTime,
              previousClosePrice,
              changePercent,
            },
          },
        }


        response.status(Status.OK).json(data)
      } catch (error) {
        if (error.name === 'NotFoundError') response.status(Status.NOT_FOUND).json(error)
        else next(error)
      }
    },
    create: async (request: RequestInterface<UserStock>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { id } = request.user
        const { body } = request
        const userStock = await createUserStockService.execute(id, body)

        const { id: uId, userId, symbol, qty, avgPrice } = userStock
        response.status(Status.CREATED).json({ id: uId, userId, symbol, qty, avgPrice })
      } catch (error) {
        if (error.name === 'ValidationError') response.status(Status.BAD_REQUEST).json(error)
        else if (error.name === 'NotFoundError') response.status(Status.NOT_FOUND).json(error)
        else next(error)
      }
    },

    delete: async (request: RequestInterface<UserStock>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { id } = request.user
        const { symbol } = request.params
        const destroyed = await destroyUserStockService.execute(id, symbol)
        if (destroyed) response.status(Status.NO_CONTENT).json()
        else
          response.status(Status.NOT_FOUND).json({
            type: 'NotFoundError',
            message: 'UserStock cannot be found.',
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

  const api = makeInvoker(userStockController)

  router.get(
    '/:id',
    api('authenticate'),
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
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
        qty: Joi.number().required(),
        avgPrice: Joi.number().required(),
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
