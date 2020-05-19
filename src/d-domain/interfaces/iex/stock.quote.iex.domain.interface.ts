import StockPrice from '../../entities/stock.prices'

export interface StockQuoteIEXDomainInterface {
  getStocksQuote(symbols: string[]): Promise<StockPrice[]>
  getStockQuote(symbol: string): Promise<StockPrice>
}
