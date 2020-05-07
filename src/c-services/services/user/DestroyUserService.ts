import { DestroyUserServiceInterface } from '../../interfaces/UserServiceInterface'

import Operation from '../../Operation'
import { EventTypeInterface } from '../../interfaces/OperationInterface'
import { UserDomainInterface } from '../../../d-domain/interfaces/UserDomainInterface'

export default class DestroyUserService extends Operation
    implements DestroyUserServiceInterface {
    private readonly userDomain: UserDomainInterface

    constructor(userDomain: UserDomainInterface) {
        super(['SUCCESS', 'ERROR', 'NOT_FOUND'])

        this.userDomain = userDomain
    }

    getEventType(): EventTypeInterface {
        return this.getEventTypes()
    }

    execute(id: string): void {
        const { SUCCESS, ERROR, NOT_FOUND } = this.getEventType()

        this.userDomain
            .destroy(id)
            .then((destroyed) => {
                if (destroyed) this.emit(SUCCESS, null)
                else this.emit(NOT_FOUND, null)
            })
            .catch((error) => {
                this.emit(ERROR, error)
            })
    }
}
