import { OperationInterface } from './OperationInterface'
import User from '../../d-domain/entities/User'

export interface GetAllUserServiceInterface extends OperationInterface {
    execute(): void
}

export interface CreateUserServiceInterface extends OperationInterface {
    execute(body: User): void
}

export interface DestroyUserServiceInterface extends OperationInterface {
    execute(id: string): void
}
