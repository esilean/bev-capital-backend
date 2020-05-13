import { FindOptions } from 'sequelize/types'
import UserStockModel from '../../../../e-infra/data/models/user/user.stock.model'

export const optUser: FindOptions = {
  attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
}

export const optUserAndStocks: FindOptions = {
  attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
  order: [[{ model: UserStockModel, as: 'userStocks' }, 'createdAt', 'ASC']],
  include: [
    {
      association: 'userStocks',
      required: false,
      include: [
        {
          association: 'stock',
          required: false,
          include: [
            {
              association: 'stockPrices',
              required: false,
              where: {
                datePrice: new Date(new Date().toDateString()),
              },
            },
          ],
        },
      ],
    },
  ],
}
