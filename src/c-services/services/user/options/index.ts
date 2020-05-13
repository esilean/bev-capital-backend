import { FindOptions } from 'sequelize/types'

export const optUser: FindOptions = {
  attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
}

export const optUserAndStocks: FindOptions = {
  attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
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
