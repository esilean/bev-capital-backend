import { GetAllUserServiceInterface } from '../../interfaces/user.service.interface'
import { UserDomainInterface } from '../../../d-domain/interfaces/user.domain.interface'
import { optUserAndStocks } from './options'
import User from '../../../d-domain/entities/user'

export default class GetAllUserService implements GetAllUserServiceInterface {
  private readonly userDomain: UserDomainInterface

  constructor(userDomain: UserDomainInterface) {
    this.userDomain = userDomain
  }

  async execute(): Promise<User[]> {
    const usersFound = await this.userDomain.getAll(optUserAndStocks)

    return usersFound
  }
}
