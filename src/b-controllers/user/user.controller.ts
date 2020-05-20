import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'
import { celebrate, Segments, Joi } from 'celebrate'

import {
  GetAllUserServiceInterface,
  CreateUserServiceInterface,
  DestroyUserServiceInterface,
  GetUserServiceInterface,
} from '../../c-services/interfaces/user.service.interface'
import {
  RequestInterface,
  ResponseInterface,
  NextInterface,
} from '../../e-infra/cross-cutting/utils/interfaces/express.interface'
import User from '../../d-domain/entities/user'
import { AuthInterface } from '../../e-infra/cross-cutting/authentication/interfaces/auth.interface'

function userController(
  auth: AuthInterface,
  getAllUserService: GetAllUserServiceInterface,
  getUserService: GetUserServiceInterface,
  createUserService: CreateUserServiceInterface,
  destroyUserService: DestroyUserServiceInterface
): unknown {
  return {
    authenticate: auth.authenticate(),
    getAll: async (request: RequestInterface<User>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const usersFound = await getAllUserService.execute()

        const users = usersFound.map((user: User) => {
          const { id, name, email, userStocks } = user

          const userStocksR = userStocks.map((us) => {
            const { id, symbol, qty, avgPrice, stock } = us

            const { name, exchange, website, stockPrices } = stock

            const stockPrice =
              stockPrices &&
              stockPrices.map((sp) => {
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
                } = sp
                return {
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
                }
              })

            return { id, symbol, qty, avgPrice, stock: { name, exchange, website, priceToday: stockPrice[0] || {} } }
          })

          return { id, name, email, stocks: userStocksR }
        })

        response.status(Status.OK).json(users)
      } catch (error) {
        next(error)
      }
    },
    get: async (request: RequestInterface<User>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { id } = request.params
        const userFound = await getUserService.execute(id)
        const { name, email, userStocks } = userFound

        const userStocksR = userStocks.map((us) => {
          const { id, symbol, qty, avgPrice, stock } = us

          const { name, exchange, website, stockPrices } = stock

          const stockPrice =
            stockPrices &&
            stockPrices.map((sp) => {
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
              } = sp

              return {
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
              }
            })

          return { id, symbol, qty, avgPrice, stock: { name, exchange, website, priceToday: stockPrice[0] || {} } }
        })

        response.status(Status.OK).json({ id, name, email, stocks: userStocksR })
      } catch (error) {
        if (error.name === 'NotFoundError') response.status(Status.NOT_FOUND).json(error)
        else next(error)
      }
    },
    create: async (request: RequestInterface<User>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { body } = request
        const user = await createUserService.execute(body)

        const { id, name, email } = user
        response.status(Status.CREATED).json({ id, name, email })
      } catch (error) {
        if (error.name === 'ValidationError') response.status(Status.BAD_REQUEST).json(error)
        else if (error.name === 'NotFoundError') response.status(Status.NOT_FOUND).json(error)
        else next(error)
      }
    },

    delete: async (request: RequestInterface<User>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { id } = request.params
        const destroyed = await destroyUserService.execute(id)

        if (destroyed) response.status(Status.NO_CONTENT).json()
        else
          response.status(Status.NOT_FOUND).json({
            type: 'NotFoundError',
            message: 'User cannot be found.',
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

  const api = makeInvoker(userController)

  router.get('/', api('authenticate'), api('getAll'))
  router.get(
    '/:id',
    //api('authenticate'),
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
        name: Joi.string().required().max(50),
        email: Joi.string().required().max(100),
        password: Joi.string().required().max(100),
      }),
    }),
    api('create')
  )
  router.delete(
    '/:id',
    api('authenticate'),
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    api('delete')
  )

  return router
}
