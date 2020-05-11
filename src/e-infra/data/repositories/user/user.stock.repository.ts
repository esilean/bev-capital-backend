import { FindOptions, CreateOptions } from 'sequelize/types'
import UserStock from '../../../../d-domain/entities/user.stock'
import { UserStockModelInterface } from '../../models/user/user.stock.model'
import { toEntity } from '../mappers/user.stock.mapper'
import { NotFoundError } from '../../../cross-cutting/utils/errors/error.handler'
import { UserStockRepositoryInterface } from '../../interfaces/user.stock.repository.interface'

export default class UserStockRepository implements UserStockRepositoryInterface {
  private userStockModel: UserStockModelInterface

  constructor(userStockModel: UserStockModelInterface) {
    this.userStockModel = userStockModel
  }

  async getAll(options?: FindOptions): Promise<UserStock[]> {
    const userStocks = await this.userStockModel.findAll(options)
    return userStocks.map((userStock) => toEntity(userStock))
  }

  async getById(id: string, options?: FindOptions): Promise<UserStock> {
    const userStock = await this.userStockModel.findByPk(id, options)
    if (userStock === null) throw new NotFoundError('UserStock cannot be found')

    return toEntity(userStock)
  }

  async create(values?: object, options?: CreateOptions): Promise<UserStock> {
    const userStockCreated = await this.userStockModel.create(values, options)

    return toEntity(userStockCreated)
  }

  async destroy(userId: string, symbol: string): Promise<boolean> {
    const userStockDestroyed = await this.userStockModel.destroy({
      where: { userId, symbol },
    })
    return userStockDestroyed > 0
  }
}
