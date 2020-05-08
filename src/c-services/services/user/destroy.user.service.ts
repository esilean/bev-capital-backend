import { DestroyUserServiceInterface } from '../../interfaces/user.service.interface'

import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import { UserDomainInterface } from '../../../d-domain/interfaces/user.domain.interface'

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