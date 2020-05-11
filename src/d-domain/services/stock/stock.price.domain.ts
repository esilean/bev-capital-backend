import { StockPriceDomainInterface } from '../../interfaces/stock.price.domain.interface'
import { StockPriceRepositoryInterface } from '../../../e-infra/data/interfaces/stock.price.repository.interface'
import StockPrice from '../../entities/stock.prices'
import { FindOptions, CreateOptions, ValidationError, UpdateOptions } from 'sequelize/types'
import { validateSync } from 'class-validator'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/get.error.validation'
import { toDB } from '../../../e-infra/data/repositories/mappers/stock.price.mapper'

export default class StockPriceDomain implements StockPriceDomainInterface {
  private readonly stockPriceRepository: StockPriceRepositoryInterface

  constructor(stockPriceRepository: StockPriceRepositoryInterface) {
    this.stockPriceRepository = stockPriceRepository
  }

  async getAll(options?: FindOptions): Promise<StockPrice[]> {
    return await this.stockPriceRepository.getAll(options)
  }

  async create(newStockPrice: StockPrice, options?: CreateOptions): Promise<StockPrice> {
    const errors = validateSync(newStockPrice, {
      validationError: { target: false },
    })
    if (errors.length > 0) {
      const error: Error = new ValidationError(getErrors(errors))
      throw error
    }

    //validar stock dup
    const opt: FindOptions = {
      limit: 1,
      attributes: ['symbol'],
      where: { symbol: newStockPrice.symbol, datePrice: newStockPrice.datePrice },
    }
    const stockPriceExists = await this.stockPriceRepository.getAll(opt)
    if (stockPriceExists.length > 0) {
      const error: Error = new ValidationError('Stock Price already exists')
      throw error
    }

    return this.stockPriceRepository
      .create(toDB(newStockPrice), options)
      .then((stockPriceCreated) => {
        return stockPriceCreated
      })
      .catch((error) => {
        throw error
      })
  }

  update(symbol: string, datePrice: Date, newStockPrice: StockPrice, options?: UpdateOptions): Promise<StockPrice> {
    return this.stockPriceRepository
      .update(symbol, datePrice, toDB(newStockPrice), options)
      .then((stockPriceUpdated) => {
        return stockPriceUpdated
      })
      .catch((error) => {
        throw error
      })
  }

  async destroy(symbol: string, datePrice: Date): Promise<boolean> {
    return await this.stockPriceRepository.destroy(symbol, datePrice)
  }
}
