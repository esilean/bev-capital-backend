import { GetTokenServiceInterface } from '../../interfaces/TokenServiceInterface'
import { UserRepositoryInterface } from '../../../e-infra/data/interfaces/UserRepositoryInterface'

import Operation from '../../Operation'
import { EventTypeInterface } from '../../interfaces/OperationInterface'
import { validate } from 'class-validator'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/getErrorValidation'
import Token from '../../../d-domain/entities/Token'
import { FindOptions } from 'sequelize/types'
import { comparePassword } from '../../../e-infra/cross-cutting/authentication/encryption'
import {
    TokenInterface,
    JwtInterface,
} from '../../../e-infra/cross-cutting/authentication/interfaces/AuthInterface'

export default class GetTokenService extends Operation
    implements GetTokenServiceInterface {
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
        const {
            SUCCESS,
            ERROR,
            VALIDATION_ERROR,
            NOT_FOUND,
        } = this.getEventType()

        const { email, password } = body

        const newToken = new Token(email, password)

        validate(newToken, { validationError: { target: false } }).then(
            (errors) => {
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

                                const validatePass = comparePassword(
                                    password,
                                    user.password
                                )
                                if (!validatePass) {
                                    const error = new Error(
                                        'Invalid credentials.'
                                    )
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
            }
        )
    }
}
