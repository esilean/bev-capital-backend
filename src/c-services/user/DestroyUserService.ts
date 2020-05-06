import { DestroyUserServiceInterface } from '../interfaces/UserServiceInterface'
import { UserRepositoryInterface } from '../../e-infra/data/interfaces/UserRepositoryInterface'

import Operation from '../Operation'
import { EventTypeInterface } from '../interfaces/OperationInterface'

export class DestroyUserService extends Operation
    implements DestroyUserServiceInterface {
    private readonly userRepository: UserRepositoryInterface

    constructor(userRepository: UserRepositoryInterface) {
        super(['SUCCESS', 'ERROR', 'NOT_FOUND'])

        this.userRepository = userRepository
    }

    getEventType(): EventTypeInterface {
        return this.getEventTypes()
    }

    execute(id: string): void {
        const { SUCCESS, ERROR, NOT_FOUND } = this.getEventType()

        try {
            this.userRepository
                .destroy(id)
                .then((destroyed) => {
                    if (destroyed) this.emit(SUCCESS, null)
                    else this.emit(NOT_FOUND, null)
                })
                .catch((error) => {
                    this.emit(ERROR, error)
                })
        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}
