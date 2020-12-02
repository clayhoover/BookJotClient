var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var User = sequelize.import('../models/user');

// Create User Endpoint: Starter

router.post('/createuser', function (req, res) {
    var username = "The Dude";
    var pass = "therugtiedtheroomtogether";

    User.create({
        username: username,
        passwordhash: pass
    }).then(
        function message(){
            res.send("I hate The Eagles, man");
        }
    );
})

module.exports = router;