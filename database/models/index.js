const { env } = require("../../config");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    env.DB_DATABASE,
    env.DB_USERNAME,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST,
        port: env.DB_PORT,
        dialect: "mysql",
        // Globally define options for all models
        define: {
            underscored: true, // Use snake_case instead of camelCase column names
            timestamps: false, // Don't automatically add the timestamp attributes
        },
        logging: env.NODE_ENV === "development" ? console.log : false,
    }
);

const basename = path.basename(__filename);
const db = {};

// Import models
fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

// Initialize associations
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
