import { UserDomainInterface } from '../../interfaces/user.domain.interface'
import { UserRepositoryInterface } from '../../../e-infra/data/interfaces/user.repository.interface'
import User from '../../entities/user'
import { FindOptions, CreateOptions } from 'sequelize/types'
import { validateSync } from 'class-validator'
import { toDB } from '../../../e-infra/data/repositories/mappers/user.mapper'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/get.error.validation'
import { ValidationError } from '../../../e-infra/cross-cutting/utils/errors/error.handler'

export default class UserDomain implements UserDomainInterface {
    private readonly userRepository: UserRepositoryInterface

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository
    }
    async getAll(options?: FindOptions): Promise<User[]> {
        return await this.userRepository.getAll(options)
    }

    async create(newUser: User, options?: CreateOptions): Promise<User> {
        const errors = validateSync(newUser, {
            validationError: { target: false },
        })
        if (errors.length > 0) {
            const error: Error = new ValidationError(getErrors(errors))
            throw error
        }

        //validar email dup
        const opt: FindOptions = { where: { email: newUser.email } }
        const emailExists = await this.userRepository.getAll(opt)
        if (emailExists.length > 0) {
            const error: Error = new ValidationError('Email already exists')
            throw error
        }

        return this.userRepository
            .create(toDB(newUser), options)
            .then((userCreated) => {
                return userCreated
            })
            .catch((error) => {
                throw error
            })
    }
    async destroy(id: string): Promise<boolean> {
        return await this.userRepository.destroy(id)
    }
}
