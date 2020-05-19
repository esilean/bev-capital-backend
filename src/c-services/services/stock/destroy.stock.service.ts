import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'
import { DestroyStockServiceInterface } from '../../interfaces/stock.service.interface'

export default class DestroyStockService implements DestroyStockServiceInterface {
  private readonly stockDomain: StockDomainInterface

  constructor(stockDomain: StockDomainInterface) {
    this.stockDomain = stockDomain
  }

  async execute(symbol: string): Promise<boolean> {
    const destroyed = await this.stockDomain.destroy(symbol)
    return destroyed
  }
}
