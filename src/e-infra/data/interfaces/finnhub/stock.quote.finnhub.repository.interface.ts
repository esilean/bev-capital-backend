import StockPrice from '../../../../d-domain/entities/stock.prices'

export interface StockQuoteFinnhubInterface {
  c: number | null
  h: number | null
  l: number | null
  o: number | null
  pc: number | null
  t: number
}

export interface StockQuoteFinnhubRepositoryInterface {
  getStockQuote(symbol: string): Promise<StockPrice>
}
