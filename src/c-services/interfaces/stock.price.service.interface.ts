import { OperationInterface } from './operation.interface'
import StockPrice from '../../d-domain/entities/stock.prices'

export interface GetAllStockPriceServiceInterface extends OperationInterface {
  execute(): void
}

export interface CreateStockPriceServiceInterface extends OperationInterface {
  execute(body: StockPrice): void
}

export interface UpdateStockPriceServiceInterface extends OperationInterface {
  execute(symbol: string, datePrice: string, body: StockPrice): void
}

export interface DestroyStockPriceServiceInterface extends OperationInterface {
  execute(symbol: string, datePrice: string): void
}
