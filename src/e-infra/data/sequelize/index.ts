import { Sequelize } from 'sequelize-typescript'
import { ConfigInterface } from '../../cross-cutting/utils/interfaces/ConfigInterface'

export default (config: ConfigInterface): Sequelize => {
    let sequelize = null
    if (config.env === 'production')
        sequelize = new Sequelize(config.db.url, config.db)
    else sequelize = new Sequelize(config.db)

    sequelize.addModels([__dirname + '../models/**/*.ts'])

    return sequelize
}
