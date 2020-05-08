import { FindOptions, CreateOptions } from 'sequelize/types'
import User from '../entities/user'

export interface UserDomainInterface {
    getAll(options?: FindOptions): Promise<User[]>
    getById(id: string, options?: FindOptions): Promise<User>
    create(newUser: User, options?: CreateOptions): Promise<User>
    destroy(id: string): Promise<boolean>
}
