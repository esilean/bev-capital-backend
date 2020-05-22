import { FindOptions } from 'sequelize/types'

export const optStockPrice: FindOptions = {
  include: [{ association: 'stockPrice' }],
}
