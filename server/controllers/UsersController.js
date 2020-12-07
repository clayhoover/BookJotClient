const { Router, response } = require("express");
const bcrypt = require("bcrypt");

const { user } = require('../models/index');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const UsersControllerRouter = Router();
let jwt = require('jsonwebtoken');

// CRUD-DY CODE FOR USERS
// C - CREATE A USER BY REGISTRATION   (url): "/register"
// R - READ THE USER PROFILE           (url): "/profile", "/login"
// U - UPDATE USER INFORMATION         (url): "/update"
// D - DELETE THE USER                 (url): "/delete"

// Kinds of requests:
// POST - Create new info, insert info into db, sends information 
// GET - Retrieve info, or pull info from db (give me an html doc)
// PUT - Modify existing info
// DELETE - Delete data from the db

UsersControllerRouter.post('/register', jsonParser,  (request, response) => {
    // PROCESS:
    // Retrieve the data from the body of the request
    // !!! Use that data to craft a USER
    // !!! Save the USER to the db
    // Respond with the status of the action

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

    // response.json({
    //     message: "Hello from the user Register route!",
    // });
});

UsersControllerRouter.post('/login', jsonParser, (req, res) => {
    // PROCESS:
    // Retrieve the data from the body of the request
    // Verify the user exists, and the data matches what is in the record
    // If so: respond with a token
    // If not: respond with "Get off my lawn!"
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