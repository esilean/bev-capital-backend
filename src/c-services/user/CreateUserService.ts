import { CreateUserServiceInterface } from '../interfaces/UserServiceInterface'
import { UserRepositoryInterface } from '../../e-infra/data/interfaces/UserRepositoryInterface'

import Operation from '../Operation'
import { EventTypeInterface } from '../interfaces/OperationInterface'
import User from '../../d-domain/entities/User'
import { validate } from 'class-validator'
import { toDB } from '../../e-infra/data/repositories/mappers/userMapper'
import { getErrors } from '../../e-infra/cross-cutting/utils/errors/getErrorValidation'

export class CreateUserService extends Operation
    implements CreateUserServiceInterface {
    private readonly userRepository: UserRepositoryInterface

    constructor(userRepository: UserRepositoryInterface) {
        super(['SUCCESS', 'ERROR', 'VALIDATION_ERROR'])

        this.userRepository = userRepository
    }

    getEventType(): EventTypeInterface {
        return this.getEventTypes()
    }

    execute(body: User): void {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.getEventType()

        try {
            const { name, email, password } = body
            const newUser = new User('', name, email, password)

            validate(newUser, { validationError: { target: false } }).then(
                (errors) => {
                    if (errors.length > 0) {
                        this.emit(VALIDATION_ERROR, getErrors(errors))
                    } else {
                        this.userRepository
                            .create(toDB(newUser))
                            .then((userCreated) => {
                                const {
                                    id,
                                    name,
                                    email,
                                    createdAt,
                                    updatedAt,
                                } = userCreated
                                this.emit(SUCCESS, {
                                    id,
                                    name,
                                    email,
                                    createdAt,
                                    updatedAt,
                                })
                            })
                            .catch((error) => {
                                this.emit(ERROR, error)
                            })
                    }
                }
            )
        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}
