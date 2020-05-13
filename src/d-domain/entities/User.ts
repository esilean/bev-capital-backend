import { ValidateIf, IsEmail, IsDate, IsNotEmpty, ValidateNested, MaxLength } from 'class-validator'
import UserStock from './user.stock'

export default class User {
  private _id: string

  @MaxLength(50)
  @IsNotEmpty()
  private _name: string

  @MaxLength(100)
  @IsEmail()
  @IsNotEmpty()
  private _email: string

  @MaxLength(100)
  @ValidateIf((o) => o._id === '')
  @IsNotEmpty()
  private _password: string

  @ValidateNested()
  private _userStocks: UserStock[] = []

  @IsDate()
  private _createdAt: Date = new Date()

  @IsDate()
  private _updatedAt: Date = new Date()

  constructor(id = '', name: string, email: string, password: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id
    this._name = name
    this._email = email
    this._password = password
    this._createdAt = createdAt || new Date()
    this._updatedAt = updatedAt || new Date()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }
  get email(): string {
    return this._email
  }
  get password(): string {
    return this._password
  }

  set userStocks(userStocks: UserStock[]) {
    this._userStocks = userStocks
  }

  get userStocks(): UserStock[] {
    return this._userStocks
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
