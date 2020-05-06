/* eslint-disable @typescript-eslint/no-explicit-any */
import { container } from '../../../ioc/container'
import { Logger } from 'log4js'
//const logger = container.resolve<Logger>('logger')

export function dbConfig(env: string): any {
    const dbConfig = {
        development: {
            username: 'root',
            password: '',
            database: 'bevcapital',
            host: '127.0.0.1',
            dialect: 'mysql',
            logging: function (...msg: any[]): any {
                //logger.info(msg)
            },
            define: {
                timestamps: true,
                underscored: true,
                freezeTableName: true,
            },
        },
        test: {
            username: 'root',
            password: '',
            database: 'bevcapitaltest',
            host: '127.0.0.1',
            dialect: 'mysql',
            logging: false,
            define: {
                timestamps: true,
                underscored: true,
                freezeTableName: true,
            },
        },
    }

    if (env === 'test') return dbConfig.test

    return dbConfig.development
}
