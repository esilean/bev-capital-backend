import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import { DestroyStockPriceServiceInterface } from '../../interfaces/stock.price.service.interface'

export default class DestroyStockPriceService implements DestroyStockPriceServiceInterface {
  private readonly stockPriceDomain: StockPriceDomainInterface

  constructor(stockPriceDomain: StockPriceDomainInterface) {
    this.stockPriceDomain = stockPriceDomain
  }

  async execute(symbol: string): Promise<boolean> {
    const destroyed = await this.stockPriceDomain.destroy(symbol)
    return destroyed
  }
}
