import Stock from '../../d-domain/entities/stock'

export interface GetAllStockServiceInterface {
  execute(): Promise<Stock[]>
}

export interface GetStockServiceInterface {
  execute(symbol: string): Promise<Stock>
}

export interface CreateStockServiceInterface {
  execute(body: Stock): Promise<Stock>
}

export interface DestroyStockServiceInterface {
  execute(symbol: string): Promise<boolean>
}
