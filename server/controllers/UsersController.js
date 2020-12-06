const { Router, response } = require("express");
const bcrypt = require("bcrypt");

const { user } = require('../models/index');

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const UsersControllerRouter = Router();

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
        email: email,
        password: bcrypt.hashSync(password, 12),
    });

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

UsersControllerRouter.post('/login', jsonParser, (request, response) => {
    // PROCESS:
    // Retrieve the data from the body of the request
    // Verify the user exists, and the data matches what is in the record
    // If so: respond with a token
    // If not: respond with "Get off my lawn!"

    


    response.json({
        message: "Hello from the user Login route!",
    });
});

// TODO: Implement the following routes: "profile", "update", "terminate"

module.exports = UsersControllerRouter