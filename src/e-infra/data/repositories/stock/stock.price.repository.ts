import { StockPriceModelInterface } from '../../models/stock/stock.price.model'
import { StockPriceRepositoryInterface } from '../../interfaces/stock.price.repository.interface'
import StockPrice from '../../../../d-domain/entities/stock.prices'
import { FindOptions, CreateOptions, UpdateOptions } from 'sequelize/types'
import { toEntity } from '../mappers/stock.price.mapper'
import { NotFoundError } from '../../../cross-cutting/utils/errors/error.handler'

export default class StockPriceRepository implements StockPriceRepositoryInterface {
  private stockPriceModel: StockPriceModelInterface

  constructor(stockPriceModel: StockPriceModelInterface) {
    this.stockPriceModel = stockPriceModel
  }

  async getAll(options?: FindOptions): Promise<StockPrice[]> {
    const stockPrices = await this.stockPriceModel.findAll(options)

    return stockPrices.map((stockPrice) => toEntity(stockPrice))
  }

  async exist(symbol: string): Promise<boolean> {
    const stock = await this.stockPriceModel.findByPk(symbol)
    return stock !== null
  }

  async create(values: object, options?: CreateOptions): Promise<StockPrice> {
    const stockPriceCreated = await this.stockPriceModel.create(values, options)

    return toEntity(stockPriceCreated)
  }

  async update(values: object, options: UpdateOptions): Promise<StockPrice> {
    const rowUpdated = await this.stockPriceModel.update(values, options)

    if (rowUpdated[0] === 0) throw new NotFoundError('StockPrice cannot be updated')

    const stockPriceUpdated = await this.getAll(options)
    return toEntity(stockPriceUpdated[0])
  }

  async destroy(symbol: string): Promise<boolean> {
    const stockDestroyed = await this.stockPriceModel.destroy({
      where: { symbol },
    })
    return stockDestroyed > 0
  }
}
