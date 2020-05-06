import { GetAllUserServiceInterface } from '../interfaces/UserServiceInterface'
import { UserRepositoryInterface } from '../../e-infra/data/interfaces/UserRepositoryInterface'

import Operation from '../Operation'
import { EventTypeInterface } from '../interfaces/OperationInterface'

export class GetAllUserService extends Operation
    implements GetAllUserServiceInterface {
    private readonly userRepository: UserRepositoryInterface

    constructor(userRepository: UserRepositoryInterface) {
        super(['SUCCESS', 'ERROR'])

        this.userRepository = userRepository
    }

    getEventType(): EventTypeInterface {
        return this.getEventTypes()
    }

    execute(): void {
        const { SUCCESS, ERROR } = this.getEventType()

        try {
            this.userRepository
                .getAll()
                .then((usersFound) => {
                    const users = usersFound.map((user) => {
                        const { id, name, email, createdAt, updatedAt } = user
                        return { id, name, email, createdAt, updatedAt }
                    })

                    this.emit(SUCCESS, users)
                })
                .catch((error) => {
                    this.emit(ERROR, error)
                })
        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}
