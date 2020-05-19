import { DestroyUserServiceInterface } from '../../interfaces/user.service.interface'
import { UserDomainInterface } from '../../../d-domain/interfaces/user.domain.interface'

export default class DestroyUserService implements DestroyUserServiceInterface {
  private readonly userDomain: UserDomainInterface

  constructor(userDomain: UserDomainInterface) {
    this.userDomain = userDomain
  }

  async execute(id: string): Promise<boolean> {
    const destroyed = this.userDomain.destroy(id)
    return destroyed
  }
}
