import { FindOptions } from 'sequelize/types'

export const optStockPrices: FindOptions = {
  attributes: [
    'symbol',
    'datePrice',
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

export const optOneStockPrice = (symbol: string, datePrice: Date): FindOptions => {
  const opt: FindOptions = {
    attributes: [
      'symbol',
      'datePrice',
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
      datePrice,
    },
  }
  return opt
}
