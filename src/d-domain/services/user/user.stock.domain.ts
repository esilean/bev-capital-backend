import { FindOptions, CreateOptions } from 'sequelize/types'
import UserStock from '../../entities/user.stock'
import { UserStockDomainInterface } from '../../interfaces/user.stocks.domain.interface'
import { UserStockRepositoryInterface } from '../../../e-infra/data/interfaces/user.stock.repository.interface'
import { validateSync } from 'class-validator'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/get.error.validation'
import { toDB } from '../../../e-infra/data/repositories/mappers/user.stock.mapper'
import { ValidationError } from '../../../e-infra/cross-cutting/utils/errors/error.handler'
import { StockRepositoryInterface } from '../../../e-infra/data/interfaces/stock.repository.interface'

export default class UserStockDomain implements UserStockDomainInterface {
  private readonly userStockRepository: UserStockRepositoryInterface
  private readonly stockRepository: StockRepositoryInterface

  constructor(userStockRepository: UserStockRepositoryInterface, stockRepository: StockRepositoryInterface) {
    this.userStockRepository = userStockRepository
    this.stockRepository = stockRepository
  }

  async getAll(options?: FindOptions): Promise<UserStock[]> {
    return await this.userStockRepository.getAll(options)
  }

  async getById(id: string, options?: FindOptions): Promise<UserStock> {
    return await this.userStockRepository.getById(id, options)
  }

  async create(newUserStock: UserStock, options?: CreateOptions): Promise<UserStock> {
    //validar stock exists
    const stock = await this.stockRepository.getBySymbol(newUserStock.symbol)
    newUserStock.stock = stock

    const errors = validateSync(newUserStock, {
      validationError: { target: false },
    })
    if (errors.length > 0) {
      const error: Error = new ValidationError(getErrors(errors))
      throw error
    }

    //validar user stock dup
    const opt: FindOptions = {
      limit: 1,
      attributes: ['id'],
      where: { userId: newUserStock.userId, symbol: newUserStock.symbol },
    }
    const userStockExists = await this.userStockRepository.getAll(opt)
    if (userStockExists.length > 0) {
      const error: Error = new ValidationError('Stock already added to user')
      throw error
    }

    return this.userStockRepository
      .create(toDB(newUserStock), options)
      .then((userStockCreated) => {
        return userStockCreated
      })
      .catch((error) => {
        throw error
      })
  }

  async destroy(userId: string, symbol: string): Promise<boolean> {
    return await this.userStockRepository.destroy(userId, symbol)
  }
}
