import StockModel from '../../../src/e-infra/data/models/stock/stock.model'
import UserStockModel from '../../../src/e-infra/data/models/user/user.stock.model'
import StockPriceModel from '../../../src/e-infra/data/models/stock/stock.price.model'
import UserModel from '../../../src/e-infra/data/models/user/user.model'

export async function cleanOthers(): Promise<void> {
  await StockPriceModel.destroy({ where: {} })
  await UserStockModel.destroy({ where: {} })
  await StockModel.destroy({ where: {} })
}

export async function cleanUsers(): Promise<void> {
  await UserModel.destroy({ where: {} })
}
