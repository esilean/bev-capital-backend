/* eslint-disable @typescript-eslint/no-unused-vars */
import Status from 'http-status'
import { RequestInterface, ResponseInterface, NextInterface } from '../interfaces/express.interface'

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

export default (error: Error, request: RequestInterface<string>, response: ResponseInterface, next: NextInterface): void => {
  let env = 'production'
  if (request.container) {
    const { logger, config } = request.container.cradle
    env = config.env
    logger.error(error)
  }

  const resp = Object.assign(
    {
      type: 'InternalServerError',
    },
    env === 'development' && {
      message: error.message,
      stack: error.stack,
    }
  )

  response.status(Status.INTERNAL_SERVER_ERROR).json(resp)
}
