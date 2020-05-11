import { IsNotEmpty, IsDate, MaxLength, IsNumber } from 'class-validator'

export default class StockPrice {
  @MaxLength(20)
  @IsNotEmpty()
  private _symbol: string

  @IsDate()
  @IsNotEmpty()
  private _datePrice: Date

  @IsNumber()
  @IsNotEmpty()
  private _open: number

  @IsNumber()
  @IsNotEmpty()
  private _close: number

  @IsNumber()
  @IsNotEmpty()
  private _high: number

  @IsNumber()
  @IsNotEmpty()
  private _low: number

  @IsNumber()
  @IsNotEmpty()
  private _latestPrice: number

  @IsDate()
  private _latestPriceTime: Date

  @IsNumber()
  @IsNotEmpty()
  private _delayedPrice: number

  @IsDate()
  private _delayedPriceTime: Date

  @IsNumber()
  private _previousClosePrice: number

  @IsDate()
  private _createdAt: Date

  @IsDate()
  private _updatedAt: Date

  constructor(
    symbol: string,
    datePrice: Date,
    open: number,
    close: number,
    high: number,
    low: number,
    latestPrice: number,
    latestPriceTime: Date,
    delayedPrice: number,
    delayedPriceTime: Date,
    previousClosePrice: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._symbol = symbol
    this._datePrice = datePrice
    this._open = open
    this._close = close
    this._high = high
    this._low = low
    this._latestPrice = latestPrice
    this._latestPriceTime = latestPriceTime
    this._delayedPrice = delayedPrice
    this._delayedPriceTime = delayedPriceTime
    this._previousClosePrice = previousClosePrice
    this._createdAt = createdAt || new Date()
    this._updatedAt = updatedAt || new Date()
  }

  get symbol(): string {
    return this._symbol
  }

  get datePrice(): Date {
    return this._datePrice
  }

  get open(): number {
    return this._open
  }

  get close(): number {
    return this._close
  }

  get high(): number {
    return this._high
  }
  get low(): number {
    return this._low
  }

  get latestPrice(): number {
    return this._latestPrice
  }

  get latestPriceTime(): Date {
    return this._latestPriceTime
  }

  get delayedPrice(): number {
    return this._delayedPrice
  }

  get delayedPriceTime(): Date {
    return this._delayedPriceTime
  }

  get previousClosePrice(): number {
    return this._previousClosePrice
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
