import StockPrice from '../../../d-domain/entities/stock.prices'
import { StockQuoteFinnhubDomainInterface } from '../../../d-domain/interfaces/finnhub/stock.quote.finnhub.domain.interface'
import { GetStockQuoteFinnhubServiceInterface } from '../../interfaces/finnhub/stock.quote.finnhub.service.interface'

export default class GetStockQuoteFinnhubService implements GetStockQuoteFinnhubServiceInterface {
  private readonly stockQuoteFinnhubDomain: StockQuoteFinnhubDomainInterface

  constructor(stockQuoteFinnhubDomain: StockQuoteFinnhubDomainInterface) {
    this.stockQuoteFinnhubDomain = stockQuoteFinnhubDomain
  }

  async execute(symbol: string): Promise<StockPrice> {
    try {
      const stockPrice = await this.stockQuoteFinnhubDomain.getStockQuote(symbol)
      return stockPrice
    } catch (error) {
      throw new Error(error)
    }
  }
}
