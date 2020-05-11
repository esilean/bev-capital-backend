import { OperationInterface } from './operation.interface'
import User from '../../d-domain/entities/user'

export interface GetAllUserServiceInterface extends OperationInterface {
  execute(): void
}

export interface GetUserServiceInterface extends OperationInterface {
  execute(id: string): void
}

export interface CreateUserServiceInterface extends OperationInterface {
  execute(body: User): void
}

export interface DestroyUserServiceInterface extends OperationInterface {
  execute(id: string): void
}
