/* eslint-disable @typescript-eslint/no-explicit-any */
import passport, { PassportStatic } from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthInterface } from './interfaces/auth.interface'
import { UserRepositoryInterface } from '../../data/interfaces/user.repository.interface'
import { ConfigInterface } from '../utils/interfaces/config.interface'
import { Handler } from 'express'
import User from '../../../d-domain/entities/user'
import { optUser } from '../../../c-services/services/user/options'

export default class Auth implements AuthInterface {
    passport: PassportStatic

    constructor(userRepository: UserRepositoryInterface, config: ConfigInterface) {
        const opt = Object.create(null)

        opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
        opt.secretOrKey = config.authSecret
        // opt.issuer = ''
        // opt.audience = ''

        const strategy = new Strategy(opt, async function (payload, done) {
            try {
                const user = await userRepository.getById(payload.id, optUser)

                if (user !== null) {
                    const { id, email } = user
                    done(null, { id, email })
                } else {
                    done(null, false)
                }
            } catch (error) {
                done(error, null)
            }
        })

        this.passport = passport

        this.passport.use(strategy)

        this.passport.serializeUser<any, any>(function (user: User, done) {
            done(null, user.id)
        })

        this.passport.deserializeUser(function (id: string, done) {
            userRepository
                .getById(id)
                .then((user) => {
                    return done(null, user)
                })
                .catch((error) => {
                    return done(error, null)
                })
        })
    }

    initialize(): Handler {
        return this.passport.initialize()
    }

    authenticate(): any {
        return this.passport.authenticate('jwt', { session: false })
    }
}
