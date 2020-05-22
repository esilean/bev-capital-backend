import StockPrice from '../../entities/stock.prices'
import { StockQuoteFinnhubDomainInterface } from '../../interfaces/finnhub/stock.quote.finnhub.domain.interface'
import { StockQuoteFinnhubRepositoryInterface } from '../../../e-infra/data/interfaces/finnhub/stock.quote.finnhub.repository.interface'

export default class StockQuoteFinnhubDomain implements StockQuoteFinnhubDomainInterface {
  private readonly stockQuoteFinnhubRepository: StockQuoteFinnhubRepositoryInterface

  constructor(stockQuoteFinnhubRepository: StockQuoteFinnhubRepositoryInterface) {
    this.stockQuoteFinnhubRepository = stockQuoteFinnhubRepository
  }

  async getStockQuote(symbol: string): Promise<StockPrice> {
    return await this.stockQuoteFinnhubRepository.getStockQuote(symbol)
  }
}
