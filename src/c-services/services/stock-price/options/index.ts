import { FindOptions } from 'sequelize/types'

export const optStockPrices: FindOptions = {
  attributes: [
    'symbol',
    'open',
    'close',
    'high',
    'low',
    'latestPrice',
    'latestPriceTime',
    'delayedPrice',
    'delayedPriceTime',
    'previousClosePrice',
    'createdAt',
    'updatedAt',
  ],
}

export const optOneStockPrice = (symbol: string): FindOptions => {
  const opt: FindOptions = {
    attributes: [
      'symbol',
      'open',
      'close',
      'high',
      'low',
      'latestPrice',
      'latestPriceTime',
      'delayedPrice',
      'delayedPriceTime',
      'previousClosePrice',
      'createdAt',
      'updatedAt',
    ],
    where: {
      symbol,
    },
  }
  return opt
}
