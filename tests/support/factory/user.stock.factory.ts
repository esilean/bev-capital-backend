import faker from 'faker'
import UserStockModel from '../../../src/e-infra/data/models/user/user.stock..model'

export async function userStockFactory({
    userId = faker.random.uuid(),
    symbol = faker.lorem.word(),
    qty = faker.finance.amount(),
    avgPrice = faker.finance.amount(),
}): Promise<UserStockModel> {
    return UserStockModel.create({ userId, symbol, qty, avgPrice })
}
