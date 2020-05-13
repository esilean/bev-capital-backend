import StockModel from '../../../src/e-infra/data/models/stock/stock.model'
import UserStockModel from '../../../src/e-infra/data/models/user/user.stock.model'
import StockPriceModel from '../../../src/e-infra/data/models/stock/stock.price.model'
import UserModel from '../../../src/e-infra/data/models/user/user.model'

export function cleanOthers(): void {
  StockPriceModel.destroy({ where: {} })
  UserStockModel.destroy({ where: {} })
  StockModel.destroy({ where: {} })
}

export function cleanUsers(): void {
  UserModel.destroy({ where: {} })
}
