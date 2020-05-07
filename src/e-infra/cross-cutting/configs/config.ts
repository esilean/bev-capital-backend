require('dotenv').config()

import { configs } from './environments/all'

const ENV: string = process.env.NODE_ENV || 'development'

const config = configs(ENV)

export { config }
