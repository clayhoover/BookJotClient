const Sequelize = require("sequelize");

const applicationSequelizeObject = new Sequelize("BookJot", "postgres", "strawberries00", {
    host: "localhost",
    dialect: "postgres",
});

module.exports = applicationSequelizeObject;