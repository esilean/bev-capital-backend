import { CreateStockServiceInterface } from '../../interfaces/stock.service.interface'
import Stock from '../../../d-domain/entities/stock'
import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'
import { Sequelize } from 'sequelize/types'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'
import StockPrice from '../../../d-domain/entities/stock.prices'

export default class CreateStockService implements CreateStockServiceInterface {
  private readonly stockDomain: StockDomainInterface
  private readonly stockPriceDomain: StockPriceDomainInterface
  private readonly database: Sequelize

  constructor(stockDomain: StockDomainInterface, stockPriceDomain: StockPriceDomainInterface, database: Sequelize) {
    this.database = database
    this.stockDomain = stockDomain
    this.stockPriceDomain = stockPriceDomain
  }

  async execute(body: Stock): Promise<Stock> {
    const { symbol, name, exchange, website } = body

    const stockPrice = new StockPrice(symbol, 0, 0, 0, 0, 0, new Date(), 0, new Date(), 0)
    const newStock = new Stock(symbol, name, exchange, website, stockPrice)

    const result = await this.database.transaction(async (t) => {
      const stock = await this.stockDomain.create(newStock, { include: ['stockPrice'], transaction: t })

      return stock
    })

    return result
  }
}
