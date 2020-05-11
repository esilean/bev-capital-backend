import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'

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
    getAll: (request: RequestInterface<User>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR } = getAllUserService.getEventType()

      getAllUserService
        .on(SUCCESS, (users: User[]) => {
          response.status(Status.OK).json(users)
        })
        .on(ERROR, next)

      getAllUserService.execute()
    },
    get: (request: RequestInterface<User>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR, NOT_FOUND } = getUserService.getEventType()

      getUserService
        .on(SUCCESS, (user: User) => {
          response.status(Status.OK).json(user)
        })
        .on(NOT_FOUND, (error: Error) => {
          response.status(Status.NOT_FOUND).json(error)
        })
        .on(ERROR, next)

      const { id } = request.user
      getUserService.execute(id)
    },
    create: (request: RequestInterface<User>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR, VALIDATION_ERROR } = createUserService.getEventType()

      createUserService
        .on(SUCCESS, (user: User) => {
          response.status(Status.CREATED).json(user)
        })
        .on(VALIDATION_ERROR, (error: Error) => {
          response.status(Status.BAD_REQUEST).json(error)
        })
        .on(ERROR, next)

      const { body } = request
      createUserService.execute(body)
    },

    delete: (request: RequestInterface<User>, response: ResponseInterface, next: NextInterface): void => {
      const { SUCCESS, ERROR, NOT_FOUND, VALIDATION_ERROR } = destroyUserService.getEventType()

      destroyUserService
        .on(SUCCESS, () => {
          response.status(Status.NO_CONTENT).json()
        })
        .on(VALIDATION_ERROR, (error: Error) => {
          response.status(Status.BAD_REQUEST).json(error)
        })
        .on(NOT_FOUND, () => {
          response.status(Status.NOT_FOUND).json({
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

  router.get('/', api('authenticate'), api('getAll'))
  router.get('/:id', api('authenticate'), api('get'))
  router.post('/', api('authenticate'), api('create'))
  router.delete('/:id', api('authenticate'), api('delete'))

  return router
}
