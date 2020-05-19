import faker from 'faker'
import StockPriceModel from '../../../src/e-infra/data/models/stock/stock.price.model'

export async function stockPriceFactory({
  symbol = faker.random.alphaNumeric(15),
  open = faker.random.number(),
  close = faker.random.number(),
  high = faker.random.number(),
  low = faker.random.number(),
  latestPrice = faker.random.number(),
  latestPriceTime = faker.date.recent(),
  delayedPrice = faker.random.number(),
  delayedPriceTime = faker.date.recent(),
  previousClosePrice = faker.random.number(),
}): Promise<StockPriceModel> {
  return StockPriceModel.create({
    symbol,
    open,
    close,
    high,
    low,
    latestPrice,
    latestPriceTime,
    delayedPrice,
    delayedPriceTime,
    previousClosePrice,
  })
}
