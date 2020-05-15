import jwt from 'jsonwebtoken'
import { TokenInterface, JwtInterface } from './interfaces/auth.interface'
import { ConfigInterface } from '../utils/interfaces/config.interface'
import { NotFoundError } from '../utils/errors/error.handler'

export default class Jwt implements JwtInterface {
  private config: ConfigInterface
  private secret: string

  constructor(config: ConfigInterface) {
    this.config = config

    if (!this.config.authSecret) throw new NotFoundError('AuthSecret cannot be found')

    this.secret = this.config.authSecret
  }

  signin(payload: TokenInterface): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1 day' })
  }

  verify(token: string): boolean {
    try {
      jwt.verify(token, this.secret)
      return true
    } catch (error) {
      return false
    }
  }
}
