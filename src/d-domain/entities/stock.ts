import { IsNotEmpty, IsDate, ValidateNested } from 'class-validator'
import UserStock from './user.stock'
import StockPrice from './stock.prices'

export default class Stock {
  @IsNotEmpty()
  private _symbol: string

  @IsNotEmpty()
  private _name: string

  @IsNotEmpty()
  private _exchange: string

  @IsNotEmpty()
  private _website: string

  @ValidateNested()
  private _userStocks: UserStock[] = []

  @ValidateNested()
  private _stockPrices: StockPrice[] = []

  @IsDate()
  private _createdAt: Date

  @IsDate()
  private _updatedAt: Date

  constructor(symbol: string, name: string, exchange: string, website: string, createdAt?: Date, updatedAt?: Date) {
    this._symbol = symbol
    this._name = name
    this._exchange = exchange
    this._website = website
    this._createdAt = createdAt || new Date()
    this._updatedAt = updatedAt || new Date()
  }

  get symbol(): string {
    return this._symbol
  }

  get name(): string {
    return this._name
  }

  get exchange(): string {
    return this._exchange
  }

  get website(): string {
    return this._website
  }

  set userStocks(userStocks: UserStock[]) {
    this._userStocks = userStocks
  }

  get userStocks(): UserStock[] {
    return this._userStocks
  }

  set stockPrices(stockPrices: StockPrice[]) {
    this._stockPrices = stockPrices
  }

  get stockPrices(): StockPrice[] {
    return this._stockPrices
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt
  }
  get createdAt(): Date {
    return this._createdAt
  }
  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt
  }
  get updatedAt(): Date {
    return this._updatedAt
  }
}
