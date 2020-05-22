import StockPrice from '../../entities/stock.prices'

export interface StockQuoteFinnhubDomainInterface {
  getStockQuote(symbol: string): Promise<StockPrice>
}
