import { OperationInterface } from './operation.interface'
import Token from '../../d-domain/entities/token'

export interface GetTokenServiceInterface extends OperationInterface {
    execute(body: Token): void
}
