import UserLogin from '../../d-domain/entities/user-login'
import Token from '../../d-domain/entities/token'
import { TokenInterface } from '../../e-infra/cross-cutting/authentication/interfaces/auth.interface'

export interface GetTokenServiceInterface {
  execute(body: UserLogin): Promise<TokenInterface>
}

export interface VerifyTokenServiceInterface {
  execute(body: Token): Promise<boolean>
}
