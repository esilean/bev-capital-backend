import { Sequelize } from 'sequelize-typescript'
import { ConfigInterface } from '../../cross-cutting/utils/interfaces/config.interface'
import path from 'path'

export default (config: ConfigInterface): Sequelize => {
    let sequelize: Sequelize
    if (config.env === 'production') {
        sequelize = new Sequelize(config.db.url, config.db)
    } else {
        sequelize = new Sequelize(config.db)
    }

    sequelize.addModels([path.join(__dirname, '../models/**/*')])

    return sequelize
}
