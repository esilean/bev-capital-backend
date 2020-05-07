import { UserModelInterface } from '../../models/user/UserModel'
import { UserRepositoryInterface } from '../../interfaces/UserRepositoryInterface'
import { FindOptions, CreateOptions } from 'sequelize/types'
import { toEntity } from '../mappers/userMapper'
import User from '../../../../d-domain/entities/User'

export default class UserRepository implements UserRepositoryInterface {
    private userModel: UserModelInterface

    constructor(userModel: UserModelInterface) {
        this.userModel = userModel
    }

    async getAll(options?: FindOptions): Promise<User[]> {
        const users = await this.userModel.findAll(options)

        return users.map((user) => toEntity(user))
    }

    async getById(id: string, options?: FindOptions): Promise<User> {
        const user = await this.userModel.findByPk(id, options)
        if (user === null) throw new Error('User cannot be found')

        return toEntity(user)
    }

    async create(values?: object, options?: CreateOptions): Promise<User> {
        const userCreated = await this.userModel.create(values, options)

        return toEntity(userCreated)
    }

    async destroy(id: string): Promise<boolean> {
        const userDestroyed = await this.userModel.destroy({
            where: { id },
        })
        return userDestroyed > 0
    }
}
