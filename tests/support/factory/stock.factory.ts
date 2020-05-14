import faker from 'faker'
import StockModel from '../../../src/e-infra/data/models/stock/stock.model'

export async function stockFactory({
  symbol = faker.random.alphaNumeric(20),
  name = faker.random.alphaNumeric(45),
  exchange = faker.random.word(),
  website = faker.internet.url(),
}): Promise<StockModel> {
  return StockModel.create({ symbol, name, exchange, website })
}
