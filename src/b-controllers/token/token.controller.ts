import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'
import { celebrate, Segments, Joi } from 'celebrate'

import {
  RequestInterface,
  ResponseInterface,
  NextInterface,
} from '../../e-infra/cross-cutting/utils/interfaces/express.interface'
import { GetTokenServiceInterface, VerifyTokenServiceInterface } from '../../c-services/interfaces/token.service.interface'
import UserLogin from '../../d-domain/entities/user-login'
import Token from '../../d-domain/entities/token'

function tokenController(getTokenService: GetTokenServiceInterface, verifyTokenService: VerifyTokenServiceInterface): unknown {
  return {
    getToken: async (request: RequestInterface<UserLogin>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { body } = request
        const token = await getTokenService.execute(body)
        response.status(Status.OK).json(token)
      } catch (error) {
        if (error.name === 'ValidationError')
          response.status(Status.BAD_REQUEST).json({
            type: 'ValidationError',
            message: error.message,
          })
        else if (error.name === 'NotFoundError')
          response.status(Status.NOT_FOUND).json({
            type: 'NotFoundError',
            message: error.message,
          })
        else next(error)
      }
    },

    verifyToken: async (request: RequestInterface<Token>, response: ResponseInterface, next: NextInterface): Promise<void> => {
      try {
        const { body } = request
        const token = await verifyTokenService.execute(body)
        response.status(Status.OK).json(token)
      } catch (error) {
        if (error.name === 'ValidationError')
          response.status(Status.BAD_REQUEST).json({
            type: 'ValidationError',
            message: error.message,
          })
        else next(error)
      }
    },
  }
}

export default (): Router => {
  const router = Router()

  const api = makeInvoker(tokenController)

  router.post(
    '/',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().max(100),
        password: Joi.string().required().max(50),
      }),
    }),
    api('getToken')
  )

  router.post(
    '/verify',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required(),
      }),
    }),
    api('verifyToken')
  )

  return router
}
