require('dotenv').config()

import { configs } from './config'

const ENV: string = process.env.NODE_ENV || 'development'

const config = configs(ENV)

export { config }
