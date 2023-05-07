const dotenv = require("dotenv");

const loadEnvironmentVariables = () => {
    const {
        NODE_ENV,
        JWT_SECRET,
        TOKEN_EXPIRATION,
        DB_HOST,
        DB_PORT,
        DB_DATABASE,
        DB_USERNAME,
        DB_PASSWORD,
    } = process.env;

    return {
        NODE_ENV,
        JWT_SECRET,
        TOKEN_EXPIRATION,
        DB_HOST,
        DB_PORT,
        DB_DATABASE,
        DB_USERNAME,
        DB_PASSWORD,
    };
};

const port = process.env.PORT || 4000;

const result = dotenv.config();
const env = result.error ? loadEnvironmentVariables() : result.parsed;

if (result.error) {
    console.log(
        "Error loading environment variables. Loading in manually set environment variables"
    );
}

module.exports = { port, env };
