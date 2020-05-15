import { IsNotEmpty } from 'class-validator'

export default class Token {
  @IsNotEmpty()
  token: string

  constructor(token: string) {
    this.token = token
  }
}
