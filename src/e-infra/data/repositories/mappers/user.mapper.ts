import User from '../../../../d-domain/entities/user'
import { UserInterface } from '../../interfaces/user.repository.interface'
import UserStock from '../../../../d-domain/entities/user.stock'

export function toEntity(values: UserInterface): User {
  const { id, name, email, password, userStocks, createdAt, updatedAt } = values

  let userStocksD: UserStock[] = []
  userStocksD =
    userStocks &&
    userStocks.map((us) => {
      const { id, userId, symbol, qty, avgPrice, createdAt, updatedAt } = us
      return new UserStock(id, userId, symbol, qty, avgPrice, createdAt, updatedAt)
    })

  const user = new User(id, name, email, password, createdAt, updatedAt)
  user.userStocks = userStocksD

  return user
}

export function toDB(user: User): object {
  const { name, email, password } = user
  return { name, email, password }
}
