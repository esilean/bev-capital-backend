import {
  StockQuoteIEXRepositoryInterface,
  StockQuoteValueIEXInterface,
  StockBatchIEXInterface,
} from '../../interfaces/iex/stock.quote.iex.repository.interface'
import { ConfigInterface } from '../../../cross-cutting/utils/interfaces/config.interface'

import axios from 'axios'
import { toEntity } from '../mappers/iex/stock.quote.iex.mapper'
import { toEntity as toEntityBatch } from '../mappers/iex/stock.batch.iex.mapper'
import StockPrice from '../../../../d-domain/entities/stock.prices'

export default class StockQuoteIEXRepository implements StockQuoteIEXRepositoryInterface {
  private config: ConfigInterface
  constructor(config: ConfigInterface) {
    this.config = config
  }

  async getStocksQuote(symbols: string[]): Promise<StockPrice[]> {
    if (!this.config.iexBaseURL || !this.config.iexToken) throw new Error('IEX Stock URL/Token is not configured.')
    const stockUrl =
      this.config.iexBaseURL + `/stock/market/batch?symbols=${symbols.join()}&types=quote&token=${this.config.iexToken}`

    const response = await axios.get<StockBatchIEXInterface>(stockUrl)
    return toEntityBatch(symbols, response.data)
  }

  async getStockQuote(symbol: string): Promise<StockPrice> {
    if (!this.config.iexBaseURL || !this.config.iexToken) throw new Error('IEX Stock URL/Token is not configured.')
    const stockUrl = this.config.iexBaseURL + `/stock/${symbol}/quote?token=${this.config.iexToken}`
    const response = await axios.get<StockQuoteValueIEXInterface>(stockUrl)
    return toEntity(response.data)
  }
}
