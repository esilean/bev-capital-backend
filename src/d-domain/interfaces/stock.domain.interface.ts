import { FindOptions, CreateOptions } from 'sequelize/types'
import Stock from '../entities/stock'

export interface StockDomainInterface {
    getAll(options?: FindOptions): Promise<Stock[]>
    getBySymbol(symbol: string, options?: FindOptions): Promise<Stock>
    create(values?: object, options?: CreateOptions): Promise<Stock>
    destroy(symbol: string): Promise<boolean>
}
