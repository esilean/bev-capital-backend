import { validateSync } from 'class-validator'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/get.error.validation'
import Token from '../../../d-domain/entities/token'

import { JwtInterface } from '../../../e-infra/cross-cutting/authentication/interfaces/auth.interface'
import { VerifyTokenServiceInterface } from '../../interfaces/token.service.interface'
import { ValidationError } from '../../../e-infra/cross-cutting/utils/errors/error.handler'

export default class VerifyTokenService implements VerifyTokenServiceInterface {
  private readonly jwt: JwtInterface

  constructor(jwt: JwtInterface) {
    this.jwt = jwt
  }

  async execute(body: Token): Promise<boolean> {
    const { token } = body

    const verifyToken = new Token(token)

    const errors = validateSync(verifyToken, {
      validationError: { target: false },
    })
    if (errors.length > 0) throw new ValidationError(getErrors(errors))

    const validToken = this.jwt.verify(verifyToken.token)
    return validToken
  }
}
