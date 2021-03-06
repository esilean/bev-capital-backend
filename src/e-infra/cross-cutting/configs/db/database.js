/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
module.exports = {
    development: {
        username: 'root',
        password: '',
        database: 'bevcapital',
        host: '127.0.0.1',
        dialect: 'mysql',
        //logging: (...msg) => console.log(msg),
        logging: false,
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
    production: {
        url: process.env.CLEARDB_DATABASE_URL,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
        },
    },
}
