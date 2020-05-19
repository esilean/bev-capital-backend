import { GetStockQuoteIEXServiceInterface } from '../../interfaces/iex/stock.quote.iex.service.interface'
import { StockQuoteIEXDomainInterface } from '../../../d-domain/interfaces/iex/stock.quote.iex.domain.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'

export default class GetStockQuoteIEXService implements GetStockQuoteIEXServiceInterface {
  private readonly stockQuoteIexDomain: StockQuoteIEXDomainInterface

  constructor(stockQuoteIexDomain: StockQuoteIEXDomainInterface) {
    this.stockQuoteIexDomain = stockQuoteIexDomain
  }

  async execute(symbol: string): Promise<StockPrice> {
    try {
      const stockPrice = await this.stockQuoteIexDomain.getStockQuote(symbol)
      return stockPrice
    } catch (error) {
      throw new Error(error)
    }
  }
}
