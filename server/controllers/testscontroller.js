var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test.js');

// router.get('/', function (req, res) {

//     res.send('Hey!!! This is a test route!');
// });

// router.get('/about', function (req, res) {
//     res.send("This is an about route")
// });

// // Pass in an object
// router.get('/contact', function (req, res) {
//     res.send({user: "kenn", email: "kenn@beastmode.com"});
// });

// // Pass in an array
// router.get('/projects', function (req, res) {
//     res.send(['Project 1', 'Project 2']);
// });

// // Pass in an array of objects
// router.get('/mycontacts', function (req, res) {
//     res.send([
//         {user: "kenn", email: "kenn@beastmode.com"},
//         {user: "aaron", email: "aaron@beastmode.com"},
//         {user: "quincy", email: "quincy@beastmode.com"},
//         {user: "tom", email: "tom@beastmode.com"}
//     ]);
// });

// Controller Method 1: Simple Response

router.post('/one', function(req, res){
    res.send("Got a post request")
});

// Controller Method 2: Persisting Data

router.post('/two', function (req, res){
    let testData = "Test data for endpoint two";

    TestModel
    .create({
        testdata: testData
    }).then(dataFromDatabase => {
        res.send("Test two went through!")
    })
});

module.exports = router;