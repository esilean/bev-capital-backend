import { FindOptions } from 'sequelize/types'

export const optUserStockAndStock: FindOptions = {
  include: [
    {
      association: 'stock',
      required: false,
      include: [
        {
          association: 'stockPrice',
          required: false,
        },
      ],
    },
  ],
}
