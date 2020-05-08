import { CreateUserServiceInterface } from '../../interfaces/user.service.interface'

import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import User from '../../../d-domain/entities/user'
import { UserDomainInterface } from '../../../d-domain/interfaces/user.domain.interface'

export default class CreateUserService extends Operation implements CreateUserServiceInterface {
    private readonly userDomain: UserDomainInterface

    constructor(userDomain: UserDomainInterface) {
        super(['SUCCESS', 'ERROR', 'VALIDATION_ERROR'])

        this.userDomain = userDomain
    }

    getEventType(): EventTypeInterface {
        return this.getEventTypes()
    }

    execute(body: User): void {
        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.getEventType()

        const { name, email, password } = body
        const newUser = new User('', name, email, password)

        this.userDomain
            .create(newUser)
            .then((user) => {
                const { id, name, email, createdAt, updatedAt } = user
                this.emit(SUCCESS, { id, name, email, createdAt, updatedAt })
            })
            .catch((error: Error) => {
                if (error.name === 'ValidationError') this.emit(VALIDATION_ERROR, error)
                else this.emit(ERROR, error)
            })
    }
}
