import { FindOptions, CreateOptions } from 'sequelize/types'
import User from '../entities/user'

export interface UserDomainInterface {
    getAll(options?: FindOptions): Promise<User[]>
    create(values?: object, options?: CreateOptions): Promise<User>
    destroy(id: string): Promise<boolean>
}
