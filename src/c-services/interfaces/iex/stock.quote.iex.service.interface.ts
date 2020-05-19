import StockPrice from '../../../d-domain/entities/stock.prices'

export interface GetAllStockQuoteIEXServiceInterface {
  execute(symbols: string[]): Promise<StockPrice[]>
}

export interface GetStockQuoteIEXServiceInterface {
  execute(symbol: string): Promise<StockPrice>
}
