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
