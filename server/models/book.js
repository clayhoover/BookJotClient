const { sequelize, DataTypes } = require("sequelize");
const applicationDatabaseObject = require('../db');


const book = applicationDatabaseObject.define('book',{
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    authors: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING},
    image: { type: DataTypes.STRING},
    link: { type: DataTypes.STRING},
    title: { type: DataTypes.STRING}
});

//const Book = sequelize.model("Book", book);

module.exports = book;
