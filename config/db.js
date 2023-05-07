const config = require("./index");

module.exports = {
    development: {
        username: config.env.DB_USERNAME,
        password: config.env.DB_PASSWORD,
        database: config.env.DB_DATABASE,
        host: config.env.DB_HOST,
        port: config.env.DB_PORT,
        dialect: "mysql",
    },
};
