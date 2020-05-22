import faker from 'faker'
import StockModel from '../../../src/e-infra/data/models/stock/stock.model'

export async function stockFactory({
  symbol = faker.random.alphaNumeric(20),
  name = faker.random.alphaNumeric(45),
  exchange = faker.random.word(),
  website = faker.internet.url(),
  stockPrice = {
    symbol,
    open: 0,
    close: 0,
    high: 0,
    low: 0,
    latestPrice: 0,
    latestPriceTime: new Date(),
    delayedPrice: 0,
    delayedPriceTime: new Date(),
    previousClosePrice: 0,
  },
}): Promise<StockModel> {
  return StockModel.create({ symbol, name, exchange, website, stockPrice }, { include: ['stockPrice'] })
}
