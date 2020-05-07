/* eslint-disable @typescript-eslint/no-unused-vars */
import Status from 'http-status'
import {
    RequestInterface,
    ResponseInterface,
    NextInterface,
} from '../interfaces/ExpressInterface'

export class ValidationError extends Error {
    constructor(message: string) {
        super()
        this.name = 'ValidationError'
        this.message = message
    }
}

export default (
    error: Error,
    request: RequestInterface<string>,
    response: ResponseInterface,
    next: NextInterface
): void => {
    const { logger, config } = request.container.cradle

    logger.error(error)

    const resp = Object.assign(
        {
            type: 'InternalServerError',
        },
        config.env === 'development' && {
            message: error.message,
            stack: error.stack,
        }
    )

    response.status(Status.INTERNAL_SERVER_ERROR).json(resp)
}
