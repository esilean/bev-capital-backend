import Stock from '../../../../d-domain/entities/stock'
import { StockInterface } from '../../interfaces/stock.repository.interface'

export function toEntity(values: StockInterface): Stock {
    const { symbol, name, exchange, website, createdAt, updatedAt } = values

    const stock = new Stock(symbol, name, exchange, website, createdAt, updatedAt)

    return stock
}

export function toDB(stock: Stock): object {
    const { symbol, name, exchange, website } = stock
    return { symbol, name, exchange, website }
}
