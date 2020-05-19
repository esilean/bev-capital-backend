import { GetAllStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'
import { optStockPrices } from './options'

export default class GetAllStockPriceService implements GetAllStockPriceServiceInterface {
  private readonly stockPriceDomain: StockPriceDomainInterface

  constructor(stockPriceDomain: StockPriceDomainInterface) {
    this.stockPriceDomain = stockPriceDomain
  }

  async execute(): Promise<StockPrice[]> {
    const stockPricesFound = await this.stockPriceDomain.getAll(optStockPrices)
    return stockPricesFound
  }
}
