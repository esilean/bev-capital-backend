import Stock from '../../../d-domain/entities/stock'
import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'
import { GetAllStockServiceInterface } from '../../interfaces/stock.service.interface'

export default class GetAllStockService implements GetAllStockServiceInterface {
  private readonly stockDomain: StockDomainInterface

  constructor(stockDomain: StockDomainInterface) {
    this.stockDomain = stockDomain
  }

  async execute(): Promise<Stock[]> {
    const stocks = await this.stockDomain.getAll()
    return stocks
  }
}
