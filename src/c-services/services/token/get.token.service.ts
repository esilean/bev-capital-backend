import { GetTokenServiceInterface } from '../../interfaces/token.service.interface'
import { UserRepositoryInterface } from '../../../e-infra/data/interfaces/user.repository.interface'

import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import { validate } from 'class-validator'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/get.error.validation'
import Token from '../../../d-domain/entities/token'
import { FindOptions } from 'sequelize/types'
import { comparePassword } from '../../../e-infra/cross-cutting/authentication/encryption'
import { TokenInterface, JwtInterface } from '../../../e-infra/cross-cutting/authentication/interfaces/auth.interface'

export default class GetTokenService extends Operation implements GetTokenServiceInterface {
  private readonly userRepository: UserRepositoryInterface
  private readonly jwt: JwtInterface

  constructor(userRepository: UserRepositoryInterface, jwt: JwtInterface) {
    super(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND'])

    this.userRepository = userRepository
    this.jwt = jwt
  }

  getEventType(): EventTypeInterface {
    return this.getEventTypes()
  }

  execute(body: Token): void {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.getEventType()

    const { email, password } = body

    const newToken = new Token(email, password)

    validate(newToken, { validationError: { target: false } }).then((errors) => {
      if (errors.length > 0) {
        const error = new Error(getErrors(errors))
        this.emit(VALIDATION_ERROR, error)
      } else {
        const options: FindOptions = { where: { email } }
        this.userRepository
          .getAll(options)
          .then((usersFound) => {
            if (usersFound.length === 0) {
              const error = new Error('Invalid credentials.')
              this.emit(NOT_FOUND, error)
            } else {
              const user = usersFound[0]

              const validatePass = comparePassword(password, user.password)
              if (!validatePass) {
                const error = new Error('Invalid credentials.')
                this.emit(NOT_FOUND, error)
                return
              }

              const payload: TokenInterface = {
                id: user.id,
                name: user.name,
                email: user.email,
              }
              const token = this.jwt.signin(payload)

              payload.token = token

              this.emit(SUCCESS, payload)
            }
          })
          .catch((error) => {
            this.emit(ERROR, error)
          })
      }
    })
  }
}
