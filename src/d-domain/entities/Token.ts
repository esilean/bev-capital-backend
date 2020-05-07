import { IsEmail, IsNotEmpty } from 'class-validator'

export default class Token {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }
}
