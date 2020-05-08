/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken'
import { TokenInterface, JwtInterface } from './interfaces/auth.interface'
import { ConfigInterface } from '../utils/interfaces/config.interface'

export default class Jwt implements JwtInterface {
    private config: ConfigInterface

    constructor(config: ConfigInterface) {
        this.config = config
    }

    signin(payload: TokenInterface): string {
        const opt = Object.assign(
            {},
            {
                expiresIn: '1 day',
            }
        )
        return jwt.sign(payload, this.config.authSecret!, opt)
    }

    verify(token: string): string | object {
        return jwt.verify(token, this.config.authSecret!)
    }
}
