import { GetTokenServiceInterface } from '../../interfaces/token.service.interface'
import { UserRepositoryInterface } from '../../../e-infra/data/interfaces/user.repository.interface'

import { validateSync } from 'class-validator'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/get.error.validation'
import UserLogin from '../../../d-domain/entities/user-login'
import { FindOptions } from 'sequelize/types'
import { comparePassword } from '../../../e-infra/cross-cutting/authentication/encryption'
import { TokenInterface, JwtInterface } from '../../../e-infra/cross-cutting/authentication/interfaces/auth.interface'
import { NotFoundError, ValidationError } from '../../../e-infra/cross-cutting/utils/errors/error.handler'

export default class GetTokenService implements GetTokenServiceInterface {
  private readonly userRepository: UserRepositoryInterface
  private readonly jwt: JwtInterface

  constructor(userRepository: UserRepositoryInterface, jwt: JwtInterface) {
    this.userRepository = userRepository
    this.jwt = jwt
  }

  async execute(body: UserLogin): Promise<TokenInterface> {
    const { email, password } = body

    const newLogin = new UserLogin(email, password)

    const errors = validateSync(newLogin, {
      validationError: { target: false },
    })
    if (errors.length > 0) throw new ValidationError(getErrors(errors))

    const options: FindOptions = { where: { email } }
    const usersFound = await this.userRepository.getAll(options)

    if (usersFound.length === 0) throw new NotFoundError('Invalid credentials.')

    const user = usersFound[0]

    const validatePass = comparePassword(password, user.password)
    if (!validatePass) throw new NotFoundError('Invalid credentials.')

    const payload: TokenInterface = {
      id: user.id,
      name: user.name,
      email: user.email,
    }
    const token = this.jwt.signin(payload)

    payload.token = token

    return payload
  }
}
