module.exports = {
    development: {
        username: 'root',
        password: '',
        database: 'bevcapital',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: true,
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
        url: '',
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
        },
    },
}
