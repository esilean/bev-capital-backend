/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction(t => {
      // eslint-disable-next-line no-undef
      return Promise.all([
        queryInterface.createTable('user_stocks', {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          user_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: {
                tableName: 'users'
              },
              key: 'id'
            },
          },
          symbol: {
            type: Sequelize.STRING(20),
            allowNull: false,
            references: {
              model: {
                tableName: 'stocks'
              },
              key: 'symbol'
            },
          },
          qty: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
          },
          avg_price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW')
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW')
          }
        }, { transaction: t }),
        queryInterface.sequelize.transaction(t => {
          queryInterface.addIndex('user_stocks', ['user_id', 'symbol'], { unique: true })
        }, { transaction: t })
      ])


    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_stocks')
  }
};
