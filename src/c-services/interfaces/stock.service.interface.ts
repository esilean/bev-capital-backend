import { OperationInterface } from './operation.interface'
import Stock from '../../d-domain/entities/stock'

export interface GetAllStockServiceInterface extends OperationInterface {
    execute(): void
}

export interface GetStockServiceInterface extends OperationInterface {
    execute(symbol: string): void
}

export interface CreateStockServiceInterface extends OperationInterface {
    execute(body: Stock): void
}

export interface DestroyStockServiceInterface extends OperationInterface {
    execute(symbol: string): void
}
