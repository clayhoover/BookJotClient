const Sequelize = require("sequelize");

const applicationSequelizeObject = new Sequelize("BookJot", "postgres", "strawberries00", {
    host: "localhost",
    dialect: "postgres",
    port: 5432
});

sequelize.authenticate().then(
    function() {
        console.log('connected to recipeazy heroku postgres database');
    },
    function(err) {
        console.log(err);
        console.log('--DB.JS AUTHENTICATE ERROR--')
    }
);

module.exports = applicationSequelizeObject;