import faker from 'faker'
import StockModel from '../../../src/e-infra/data/models/stock/stock.model'

export async function stockFactory({
  symbol = faker.random.alphaNumeric(15),
  name = faker.random.word(),
  exchange = faker.random.word(),
  website = faker.internet.url(),
}): Promise<StockModel> {
  return StockModel.create({ symbol, name, exchange, website })
}
