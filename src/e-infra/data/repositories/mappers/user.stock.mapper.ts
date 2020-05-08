import { UserStockInterface } from '../../interfaces/user.stock.repository.interface'
import UserStock from '../../../../d-domain/entities/user.stock'

export function toEntity(values: UserStockInterface): UserStock {
    const { id, userId, symbol, qty, avgPrice, createdAt, updatedAt } = values

    const userStock = new UserStock(id, userId, symbol, qty, avgPrice, createdAt, updatedAt)

    return userStock
}

export function toDB(userStock: UserStock): object {
    const { userId, symbol, qty, avgPrice } = userStock
    return { userId, symbol, qty, avgPrice }
}
