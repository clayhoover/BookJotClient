const Sequelize = require('sequelize');

// const sequelize = new Sequelize('BookJot', 'postgres', 'strawberries00', {
//     host: 'localhost',
//     dialiect: 'postgres'
// });

DB_CONNECTION_STRING="postgres://postgres:strawberries00@localhost:5432/BookJot"

const sequelize = new Sequelize('postgres://postgres:strawberries00:5432/BookJot')

sequelize.authenticate().then(
    function() {
        console.log('Connected to BookJot postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;