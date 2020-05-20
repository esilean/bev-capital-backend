import { StockDomainInterface } from '../../../d-domain/interfaces/stock.domain.interface'
import { DestroyStockServiceInterface } from '../../interfaces/stock.service.interface'
import { Sequelize } from 'sequelize/types'
import { StockPriceDomainInterface } from '../../../d-domain/interfaces/stock.price.domain.interface'

export default class DestroyStockService implements DestroyStockServiceInterface {
  private readonly stockDomain: StockDomainInterface
  private readonly stockPriceDomain: StockPriceDomainInterface
  private readonly database: Sequelize

  constructor(stockDomain: StockDomainInterface, stockPriceDomain: StockPriceDomainInterface, database: Sequelize) {
    this.database = database
    this.stockDomain = stockDomain
    this.stockPriceDomain = stockPriceDomain
  }

  async execute(symbol: string): Promise<boolean> {
    const result = await this.database.transaction(async (t) => {
      await this.stockPriceDomain.destroy({ where: { symbol }, transaction: t })
      const destroyed = await this.stockDomain.destroy({ where: { symbol }, transaction: t })
      return destroyed
    })

    return result
  }
}
