import path from 'path'
import { ConfigInterface } from '../../interfaces/ConfigInterface'
import { dbConfig } from './database'

export const configs = (env: string): ConfigInterface => {
    const logPath = path.join(
        __dirname,
        `../../../../../../logs/${env.toLowerCase()}.log`
    )

    const db = dbConfig(env)

    const config: ConfigInterface = {
        env: env,
        db: db,
        port: process.env.PORT || 3000,
        logging: {
            appenders: {
                toFile: {
                    type: 'file',
                    filename: logPath,
                },
                toConsole: {
                    type: 'console',
                },
            },
            categories: {
                default: { appenders: ['toFile', 'toConsole'], level: 'DEBUG' },
            },
        },
        authSecret: process.env.SECRET,
    }

    return config
}
