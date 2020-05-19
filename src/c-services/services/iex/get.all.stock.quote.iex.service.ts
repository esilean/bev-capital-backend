import { GetAllStockQuoteIEXServiceInterface } from '../../interfaces/iex/stock.quote.iex.service.interface'
import { StockQuoteIEXDomainInterface } from '../../../d-domain/interfaces/iex/stock.quote.iex.domain.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'

export default class GetAllStockQuoteIEXService implements GetAllStockQuoteIEXServiceInterface {
  private readonly stockQuoteIexDomain: StockQuoteIEXDomainInterface

  constructor(stockQuoteIexDomain: StockQuoteIEXDomainInterface) {
    this.stockQuoteIexDomain = stockQuoteIexDomain
  }

  async execute(symbols: string[]): Promise<StockPrice[]> {
    try {
      const stocksPrice = await this.stockQuoteIexDomain.getStocksQuote(symbols)
      return stocksPrice
    } catch (error) {
      throw new Error(error)
    }
  }
}
