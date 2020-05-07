/* eslint-disable @typescript-eslint/no-explicit-any */
import passport, { PassportStatic } from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthInterface } from './interfaces/AuthInterface'
import { UserRepositoryInterface } from '../../data/interfaces/UserRepositoryInterface'
import { ConfigInterface } from '../utils/interfaces/ConfigInterface'
import { Handler } from 'express'

export default class Auth implements AuthInterface {
    passport: PassportStatic

    constructor(
        userRepository: UserRepositoryInterface,
        config: ConfigInterface
    ) {
        const opt = Object.create(null)

        opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
        opt.secretOrKey = config.authSecret
        // opt.issuer = ''
        // opt.audience = ''

        const strategy = new Strategy(opt, async function (payload, done) {
            try {

                const user = await userRepository.getById(payload.id)

                if (user !== null) done(null, user)
                else done(null, false)
            } catch (error) {
                done(error, null)
            }
        })

        this.passport = passport

        this.passport.use(strategy)

        this.passport.serializeUser<any, any>(function (user, done) {
            done(null, user)
        })

        this.passport.deserializeUser(function (user, done) {
            done(null, user)
        })
    }

    initialize(): Handler {
        return this.passport.initialize()
    }

    authenticate(): any {
        return this.passport.authenticate('jwt', { session: false })
    }
}
