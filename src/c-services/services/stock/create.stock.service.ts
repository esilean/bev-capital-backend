import { CreateStockServiceInterface } from '../../interfaces/stock.service.interface'
import Stock from '../../../d-domain/entities/stock'
import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'

export default class CreateStockService implements CreateStockServiceInterface {
  private readonly stockDomain: StockDomainInterface

  constructor(stockDomain: StockDomainInterface) {
    this.stockDomain = stockDomain
  }

  async execute(body: Stock): Promise<Stock> {
    const { symbol, name, exchange, website } = body
    const newStock = new Stock(symbol, name, exchange, website)

    const stock = await this.stockDomain.create(newStock)

    return stock
  }
}
