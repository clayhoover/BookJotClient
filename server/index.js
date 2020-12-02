const express = require('express');
const app = express();
var test = require('./controllers/testcontroller')
var user = require('./controllers/usercontroller')
var sequelize = require('./db.js');

// Import Routes
// const authRoute = require('./routes/auth');

// Route Middlewares
// app.use('/api/user', authRoute);

//PORT
// process.env.PORT || 3003;
// app.listen(port, () => console.log(`Listening on ${port}...`));


sequelize.sync(); // tip: pass in {force: true} for resetting tables

app.use(express.json());

app.use('/test', test);

app.use('/api/user', user);

app.listen(3001, function(){
    console.log('App is listening on 3001')
});