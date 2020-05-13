/* eslint-disable @typescript-eslint/no-unused-vars */
import Status from 'http-status'
import { RequestInterface, ResponseInterface, NextInterface } from '../interfaces/express.interface'


class JoiError extends Error {
  joi: unknown
  constructor(message: string) {
    super()
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super()
    this.name = 'ValidationError'
    this.message = message
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super()
    this.name = 'NotFoundError'
    this.message = message
  }
}

export default (error: JoiError, request: RequestInterface<string>, response: ResponseInterface, next: NextInterface): void => {
  let env = 'production'
  if (request.container) {
    const { logger, config } = request.container.cradle
    env = config.env
    if (env === 'development')
      logger.error(error)
  }

  let errorType = 'InternalServerError'
  let errorStatus = Status.INTERNAL_SERVER_ERROR
  if (error.joi) {
    errorType = 'ValidationError'
    errorStatus = Status.BAD_REQUEST
  }

  const resp = Object.assign(
    {
      name: errorType,
    },
    env === 'development' && {
      message: error.message,
      stack: error.stack,
    }
  )

  response.status(errorStatus).json(resp)
}
