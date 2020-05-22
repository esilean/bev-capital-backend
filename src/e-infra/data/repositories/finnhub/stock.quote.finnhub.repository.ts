import { ConfigInterface } from '../../../cross-cutting/utils/interfaces/config.interface'

import axios from 'axios'
import { toEntity } from '../mappers/finnhub/stock.quote.finnhub.mapper'
import StockPrice from '../../../../d-domain/entities/stock.prices'
import {
  StockQuoteFinnhubRepositoryInterface,
  StockQuoteFinnhubInterface,
} from '../../interfaces/finnhub/stock.quote.finnhub.repository.interface'

export default class StockQuoteFinnhubRepository implements StockQuoteFinnhubRepositoryInterface {
  private config: ConfigInterface
  constructor(config: ConfigInterface) {
    this.config = config
  }

  async getStockQuote(symbol: string): Promise<StockPrice> {
    if (!this.config.finnHubBaseURL || !this.config.finnHubToken) throw new Error('Finnhub URL/Token is not configured.')
    const stockUrl = this.config.finnHubBaseURL + `/quote?symbol=${symbol}&token=${this.config.finnHubToken}`
    const response = await axios.get<StockQuoteFinnhubInterface>(stockUrl)
    return toEntity(symbol, response.data)
  }
}
