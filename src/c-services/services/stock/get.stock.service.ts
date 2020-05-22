import Stock from '../../../d-domain/entities/stock'
import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'
import { GetStockServiceInterface } from '../../interfaces/stock.service.interface'
import { optStockPrice } from './options'

export default class GetStockService implements GetStockServiceInterface {
  private readonly stockDomain: StockDomainInterface

  constructor(stockDomain: StockDomainInterface) {
    this.stockDomain = stockDomain
  }

  async execute(symbol: string): Promise<Stock> {
    const stock = await this.stockDomain.getBySymbol(symbol, optStockPrice)

    return stock
  }
}
