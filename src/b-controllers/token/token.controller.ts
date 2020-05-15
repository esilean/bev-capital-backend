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
    getToken: (request: RequestInterface<UserLogin>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR, NOT_FOUND, VALIDATION_ERROR } = getTokenService.getEventType()

      getTokenService
        .on(SUCCESS, (token: UserLogin) => {
          response.status(Status.OK).json(token)
        })
        .on(VALIDATION_ERROR, (error: Error) => {
          response.status(Status.BAD_REQUEST).json({
            type: 'ValidationError',
            message: error.message,
          })
        })
        .on(NOT_FOUND, (error: Error) => {
          response.status(Status.NOT_FOUND).json({
            type: 'NotFoundError',
            message: error.message,
          })
        })
        .on(ERROR, next)

      const { body } = request
      getTokenService.execute(body)
    },

    verifyToken: (request: RequestInterface<Token>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR, VALIDATION_ERROR } = verifyTokenService.getEventType()

      verifyTokenService
        .on(SUCCESS, (token: boolean) => {
          response.status(Status.OK).json(token)
        })
        .on(VALIDATION_ERROR, (error: Error) => {
          response.status(Status.BAD_REQUEST).json({
            type: 'ValidationError',
            message: error.message,
          })
        })
        .on(ERROR, next)

      const { body } = request
      verifyTokenService.execute(body)
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
