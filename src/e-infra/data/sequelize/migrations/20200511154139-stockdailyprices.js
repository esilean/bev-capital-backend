/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('stock_prices', {
        symbol: {
          type: Sequelize.STRING(20),
          allowNull: false,
          references: {
            model: {
              tableName: 'stocks',
            },
            key: 'symbol',
            onUpdate: 'CASCADE',
          },
        },
        open: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        close: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        high: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        low: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        latest_price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        latest_price_time: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        delayed_price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        delayed_price_time: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        previous_close_price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      })
      .then(() => {
        return queryInterface.addConstraint('stock_prices', ['symbol'], {
          type: 'primary key',
          name: 'pkfk_symbol',
        })
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('stock_prices')
  },
}
