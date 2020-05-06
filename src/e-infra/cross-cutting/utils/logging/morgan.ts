/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from 'log4js'
import morgan from 'morgan'

export default (logger: Logger): any => {
    return morgan('dev', {
        stream: {
            write: (message: string): any => {
                logger.info(message.slice(0, -1))
            },
        },
    })
}
