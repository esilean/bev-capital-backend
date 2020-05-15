import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import { validate } from 'class-validator'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/get.error.validation'
import Token from '../../../d-domain/entities/token'

import { JwtInterface } from '../../../e-infra/cross-cutting/authentication/interfaces/auth.interface'
import { VerifyTokenServiceInterface } from '../../interfaces/token.service.interface'

export default class VerifyTokenService extends Operation implements VerifyTokenServiceInterface {
  private readonly jwt: JwtInterface

  constructor(jwt: JwtInterface) {
    super(['SUCCESS', 'ERROR', 'VALIDATION_ERROR'])

    this.jwt = jwt
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(body: Token): void {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.getEventType()

    const { token } = body

    const verifyToken = new Token(token)

    validate(verifyToken, { validationError: { target: false } })
      .then((errors) => {
        if (errors.length > 0) {
          const error = new Error(getErrors(errors))
          this.emit(VALIDATION_ERROR, error)
        } else {
          const token = this.jwt.verify(verifyToken.token)

          this.emit(SUCCESS, token)
        }
      })
      .catch((error) => {
        this.emit(ERROR, error)
      })
  }
}
