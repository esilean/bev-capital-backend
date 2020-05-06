import { ValidateIf, IsEmail, IsDate, IsNotEmpty } from 'class-validator'

export default class User {
    private _id: string

    @IsNotEmpty()
    private _name: string

    @IsEmail()
    @IsNotEmpty()
    private _email: string

    @ValidateIf((o) => o._id === '')
    @IsNotEmpty()
    private _password: string

    @IsDate()
    private _createdAt: Date = new Date()

    @IsDate()
    private _updatedAt: Date = new Date()

    constructor(id: string, name: string, email: string, password: string) {
        this._id = id
        this._name = name
        this._email = email
        this._password = password
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
}
