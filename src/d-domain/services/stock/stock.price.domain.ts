import { StockPriceDomainInterface } from '../../interfaces/stock.price.domain.interface'
import { StockPriceRepositoryInterface } from '../../../e-infra/data/interfaces/stock.price.repository.interface'
import StockPrice from '../../entities/stock.prices'
import { FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from 'sequelize/types'
import { validateSync } from 'class-validator'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/get.error.validation'
import { toDB } from '../../../e-infra/data/repositories/mappers/stock.price.mapper'
import { ValidationError } from '../../../e-infra/cross-cutting/utils/errors/error.handler'
import { StockRepositoryInterface } from '../../../e-infra/data/interfaces/stock.repository.interface'

export default class StockPriceDomain implements StockPriceDomainInterface {
  private readonly stockPriceRepository: StockPriceRepositoryInterface
  private readonly stockRepository: StockRepositoryInterface

  constructor(stockPriceRepository: StockPriceRepositoryInterface, stockRepository: StockRepositoryInterface) {
    this.stockPriceRepository = stockPriceRepository
    this.stockRepository = stockRepository
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
      where: { symbol: newStockPrice.symbol },
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

  async update(newStockPrice: StockPrice, options: UpdateOptions): Promise<StockPrice> {
    const errors = validateSync(newStockPrice, {
      validationError: { target: false },
    })
    if (errors.length > 0) {
      const error: Error = new ValidationError(getErrors(errors))
      throw error
    }

    await this.stockRepository.getBySymbol(newStockPrice.symbol, { include: ['stockPrice'] })

    return this.stockPriceRepository
      .update(toDB(newStockPrice), options)
      .then((stockPriceUpdated) => {
        return stockPriceUpdated
      })
      .catch((error) => {
        throw error
      })
  }

  async destroy(options: DestroyOptions): Promise<boolean> {
    return await this.stockPriceRepository.destroy(options)
  }
}
