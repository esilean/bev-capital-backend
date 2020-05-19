import { GetStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'
import { optOneStockPrice } from './options'
import { NotFoundError } from '../../../e-infra/cross-cutting/utils/errors/error.handler'

export default class GetStockPriceService implements GetStockPriceServiceInterface {
  private readonly stockPriceDomain: StockPriceDomainInterface

  constructor(stockPriceDomain: StockPriceDomainInterface) {
    this.stockPriceDomain = stockPriceDomain
  }

  async execute(symbol: string): Promise<StockPrice> {
    const stockPrice = await this.stockPriceDomain.getAll(optOneStockPrice(symbol))

    if (stockPrice[0] === undefined) throw new NotFoundError('Stock Price cannot be found')
    return stockPrice[0]
  }
}
