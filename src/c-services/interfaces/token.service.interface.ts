import { OperationInterface } from './operation.interface'
import UserLogin from '../../d-domain/entities/user-login'
import Token from '../../d-domain/entities/token'

export interface GetTokenServiceInterface extends OperationInterface {
  execute(body: UserLogin): void
}

export interface VerifyTokenServiceInterface extends OperationInterface {
  execute(body: Token): void
}
