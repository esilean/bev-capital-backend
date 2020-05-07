import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'

import {
    RequestInterface,
    ResponseInterface,
    NextInterface,
} from '../../e-infra/cross-cutting/utils/interfaces/ExpressInterface'
import { GetTokenServiceInterface } from '../../c-services/interfaces/TokenServiceInterface'
import { TokenInterface } from '../../e-infra/cross-cutting/authentication/interfaces/AuthInterface'
import Token from '../../d-domain/entities/Token'

function tokenController(getTokenService: GetTokenServiceInterface): unknown {
    return {
        getToken: (
            request: RequestInterface<Token>,
            response: ResponseInterface,
            next: NextInterface
        ): void => {
            const {
                SUCCESS,
                ERROR,
                NOT_FOUND,
                VALIDATION_ERROR,
            } = getTokenService.getEventType()

            getTokenService
                .on(SUCCESS, (token: TokenInterface) => {
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
    }
}

export default (): Router => {
    const router = Router()

    const api = makeInvoker(tokenController)

    router.post('/', api('getToken'))

    return router
}
