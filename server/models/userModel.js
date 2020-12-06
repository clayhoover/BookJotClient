const { DataTypes } = require('sequelize');

const applicationDatabaseObject = require('../db');

const User = applicationDatabaseObject.define('user', {
    user_email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    user_password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
});

module.exports = User;