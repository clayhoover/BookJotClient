const { DataTypes } = require('sequelize');
const applicationDatabaseObject = require('../db');

const Note = applicationDatabaseObject.define('Note', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Note;