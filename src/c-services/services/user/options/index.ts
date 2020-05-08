import { FindOptions } from 'sequelize/types'

export const optUser: FindOptions = {
    attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
}

export const optUserAndStocks: FindOptions = {
    attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    include: ['userStocks'],
}
