import StockPrice from '../../../d-domain/entities/stock.prices'

export interface GetStockQuoteFinnhubServiceInterface {
  execute(symbol: string): Promise<StockPrice>
}
