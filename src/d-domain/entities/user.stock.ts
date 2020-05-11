import { IsNotEmpty, IsDate, MaxLength } from 'class-validator'

export default class UserStock {
  private _id: string

  @IsNotEmpty()
  private _userId: string

  @MaxLength(20)
  @IsNotEmpty()
  private _symbol: string

  @IsNotEmpty()
  private _qty: number

  @IsNotEmpty()
  private _avgPrice: number

  @IsDate()
  private _createdAt: Date

  @IsDate()
  private _updatedAt: Date

  constructor(id = '', userId: string, symbol: string, qty: number, avgPrice: number, createdAt?: Date, updatedAt?: Date) {
    this._id = id
    this._userId = userId
    this._symbol = symbol
    this._qty = qty
    this._avgPrice = avgPrice
    this._createdAt = createdAt || new Date()
    this._updatedAt = updatedAt || new Date()
  }

  get id(): string {
    return this._id
  }

  get userId(): string {
    return this._userId
  }

  get symbol(): string {
    return this._symbol
  }

  get qty(): number {
    return this._qty
  }

  get avgPrice(): number {
    return this._avgPrice
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
