import { FindOptions, CreateOptions } from 'sequelize/types'
import { validateSync } from 'class-validator'
import { getErrors } from '../../../e-infra/cross-cutting/utils/errors/get.error.validation'
import { ValidationError } from '../../../e-infra/cross-cutting/utils/errors/error.handler'
import { StockDomainInterface } from '../../interfaces/stock.domain.interface'
import Stock from '../../entities/stock'
import { toDB } from '../../../e-infra/data/repositories/mappers/stock.mapper'
import { StockRepositoryInterface } from '../../../e-infra/data/interfaces/stock.repository.interface'

export default class StockDomain implements StockDomainInterface {
    private readonly stockRepository: StockRepositoryInterface

    constructor(stockRepository: StockRepositoryInterface) {
        this.stockRepository = stockRepository
    }
    async getAll(options?: FindOptions): Promise<Stock[]> {
        return await this.stockRepository.getAll(options)
    }

    async getBySymbol(symbol: string, options?: FindOptions): Promise<Stock> {
        return await this.stockRepository.getBySymbol(symbol, options)
    }

    async create(newStock: Stock, options?: CreateOptions): Promise<Stock> {
        const errors = validateSync(newStock, {
            validationError: { target: false },
        })
        if (errors.length > 0) {
            const error: Error = new ValidationError(getErrors(errors))
            throw error
        }

        //validar stock dup
        const opt: FindOptions = { where: { symbol: newStock.symbol } }
        const stockExists = await this.stockRepository.getAll(opt)
        if (stockExists.length > 0) {
            const error: Error = new ValidationError('Stock already exists')
            throw error
        }

        return this.stockRepository
            .create(toDB(newStock), options)
            .then((stockCreated) => {
                return stockCreated
            })
            .catch((error) => {
                throw error
            })
    }
    async destroy(symbol: string): Promise<boolean> {
        return await this.stockRepository.destroy(symbol)
    }
}
