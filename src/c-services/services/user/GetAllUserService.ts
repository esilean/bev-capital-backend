import { GetAllUserServiceInterface } from '../../interfaces/UserServiceInterface'

import Operation from '../../Operation'
import { EventTypeInterface } from '../../interfaces/OperationInterface'
import { UserDomainInterface } from '../../../d-domain/interfaces/UserDomainInterface'

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

        this.userDomain.getAll().then(usersFound => {
            const users = usersFound.map((user) => {
                const { id, name, email, createdAt, updatedAt } = user
                return { id, name, email, createdAt, updatedAt }
            })

            this.emit(SUCCESS, users)
        }).catch(error => {
            this.emit(ERROR, error)
        })

    }
}
