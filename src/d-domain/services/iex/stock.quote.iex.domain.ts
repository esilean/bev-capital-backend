import { StockQuoteIEXRepositoryInterface } from '../../../e-infra/data/interfaces/iex/stock.quote.iex.repository.interface'
import { StockQuoteIEXDomainInterface } from '../../interfaces/iex/stock.quote.iex.domain.interface'
import StockPrice from '../../entities/stock.prices'

export default class StockQuoteIEXDomain implements StockQuoteIEXDomainInterface {
  private readonly stockQuoteIexRepository: StockQuoteIEXRepositoryInterface

  constructor(stockQuoteIexRepository: StockQuoteIEXRepositoryInterface) {
    this.stockQuoteIexRepository = stockQuoteIexRepository
  }

  async getStocksQuote(symbols: string[]): Promise<StockPrice[]> {
    return await this.stockQuoteIexRepository.getStocksQuote(symbols)
  }

  async getStockQuote(symbol: string): Promise<StockPrice> {
    return await this.stockQuoteIexRepository.getStockQuote(symbol)
  }
}
