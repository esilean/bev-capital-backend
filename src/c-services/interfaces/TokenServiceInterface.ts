import { OperationInterface } from './OperationInterface'
import Token from '../../d-domain/entities/Token'

export interface GetTokenServiceInterface extends OperationInterface {
    execute(body: Token): void
}
