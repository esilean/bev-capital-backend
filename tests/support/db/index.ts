import UserModel from '../../../src/e-infra/data/models/user/user.model'
import StockModel from '../../../src/e-infra/data/models/stock/stock.model'
import UserStockModel from '../../../src/e-infra/data/models/user/user.stock..model'

export default (): void => {
    UserStockModel.destroy({ where: {} })
    UserModel.destroy({ where: {} })
    StockModel.destroy({ where: {} })
}
