import { GetAllUserServiceInterface } from '../../interfaces/user.service.interface'

import Operation from '../../operation'
import { EventTypeInterface } from '../../interfaces/operation.interface'
import { UserDomainInterface } from '../../../d-domain/interfaces/user.domain.interface'

export default class GetAllUserService extends Operation
    implements GetAllUserServiceInterface {
    private readonly userDomain: UserDomainInterface

    constructor(userDomain: UserDomainInterface) {
        super(['SUCCESS', 'ERROR'])

        this.userDomain = userDomain
    }

    getEventType(): EventTypeInterface {
        return this.getEventTypes()
    }

    execute(): void {
        const { SUCCESS, ERROR } = this.getEventType()

        this.userDomain
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
    }
}
