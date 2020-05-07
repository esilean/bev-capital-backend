import User from '../../../../d-domain/entities/User'
import { UserInterface } from '../../interfaces/UserRepositoryInterface'

export function toEntity(values: UserInterface): User {
    const { id, name, email, password, createdAt, updatedAt } = values

    const user = new User(id, name, email, password, createdAt, updatedAt)

    return user
}

export function toDB(user: User): object {
    const { name, email, password } = user
    return { name, email, password }
}
