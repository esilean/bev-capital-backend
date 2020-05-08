import faker from 'faker'
import StockModel from '../../../src/e-infra/data/models/stock/stock.model'

export async function stockFactory({
    symbol = faker.lorem.word(),
    name = faker.lorem.word(),
    exchange = faker.lorem.word(),
    website = faker.internet.url(),
}): Promise<StockModel> {
    return StockModel.create({ symbol, name, exchange, website })
}
