import { FindOptions, CreateOptions } from 'sequelize/types'
import User from '../../../d-domain/entities/User'

export interface UserInterface {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export interface UserRepositoryInterface {
    getAll(options?: FindOptions): Promise<User[]>
    create(values?: object, options?: CreateOptions): Promise<User>
    destroy(id: string): Promise<boolean>
}
