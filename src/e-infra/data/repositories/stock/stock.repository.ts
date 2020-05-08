import { FindOptions, CreateOptions } from 'sequelize/types'
import { toEntity } from '../mappers/stock.mapper'
import Stock from '../../../../d-domain/entities/stock'
import { StockRepositoryInterface } from '../../interfaces/stock.repository.interface'
import { StockModelInterface } from '../../models/stock/stock.model'
import { NotFoundError } from '../../../cross-cutting/utils/errors/error.handler'

export default class StockRepository implements StockRepositoryInterface {
    private stockModel: StockModelInterface

    constructor(stockModel: StockModelInterface) {
        this.stockModel = stockModel
    }

    async getAll(options?: FindOptions): Promise<Stock[]> {
        const stocks = await this.stockModel.findAll(options)

        return stocks.map((stocks) => toEntity(stocks))
    }

    async getBySymbol(symbol: string, options?: FindOptions): Promise<Stock> {
        const stock = await this.stockModel.findByPk(symbol, options)
        if (stock === null) throw new NotFoundError('Stock cannot be found')

        return toEntity(stock)
    }

    async create(values?: object, options?: CreateOptions): Promise<Stock> {
        const stockCreated = await this.stockModel.create(values, options)

        return toEntity(stockCreated)
    }

    async destroy(symbol: string): Promise<boolean> {
        const stockDestroyed = await this.stockModel.destroy({
            where: { symbol },
        })
        return stockDestroyed > 0
    }
}
