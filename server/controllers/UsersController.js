const { Router, response } = require("express");
const bcrypt = require("bcrypt");

const { user } = require('../models/index');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const UsersControllerRouter = Router();
let jwt = require('jsonwebtoken');


UsersControllerRouter.post('/register', jsonParser,  (request, response) => {

    let { email, password } = request.body;
    let newUser = user.build({ 
        user_email: email,
        user_password: bcrypt.hashSync(password, 12),
    });
    console.log("made it here")
    newUser.save()
    .then(() => {
        console.log('[server]: The new user was created');
        response.json({
            message: 'User successfully created!'
        });
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({
            message: 'Failed to create user'
        });
    });

});

UsersControllerRouter.post('/login', jsonParser, (req, res) => {
        user.findOne({ where: {user_email: req.body.email} })
        .then(
            function(user) {
                if (user) {
                    bcrypt.compare(req.body.password, user.user_password, function (err, matches) {
                        if (matches) {
                            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
                            res.json({
                                user: user,
                                message: "user successfully authenticated",
                                sessionToken: token
                            });
                        } else {
                            res.status(502).send({ error: "user sign in failed" });
                        }
                    });
                } else {
                    res.status(500).send({ error: "failed to authenticate" });
                }
            },
            function (err) {
                res.status(501).send({ error: "failed to sign in user" })
            }
        );

});

// TODO: Implement the following routes: "profile", "update", "terminate"

module.exports = UsersControllerRouter;