import StockPrice from '../../d-domain/entities/stock.prices'

export interface GetAllStockPriceServiceInterface {
  execute(): Promise<StockPrice[]>
}

export interface GetStockPriceServiceInterface {
  execute(symbol: string): Promise<StockPrice>
}

export interface CreateStockPriceServiceInterface {
  execute(body: StockPrice): Promise<StockPrice>
}

export interface UpdateStockPriceServiceInterface {
  execute(symbol: string, body: StockPrice): Promise<StockPrice>
}

export interface DestroyStockPriceServiceInterface {
  execute(symbol: string): Promise<boolean>
}
