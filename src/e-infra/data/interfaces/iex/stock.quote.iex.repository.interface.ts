import StockPrice from '../../../../d-domain/entities/stock.prices';

export interface StockBatchIEXInterface {
  [k: string]: StockQuoteIEXInterface
}

export interface StockQuoteIEXInterface {
  quote: StockQuoteValueIEXInterface
}

export interface StockQuoteValueIEXInterface {
  symbol: string
  open: number | null
  close: number | null
  high: number | null
  low: number | null
  latestPrice: number
  latestUpdate: number
  previousClose: number
}

export interface StockQuoteIEXRepositoryInterface {
  getStocksQuote(symbols: string[]): Promise<StockPrice[]>
  getStockQuote(symbol: string): Promise<StockPrice>
}
