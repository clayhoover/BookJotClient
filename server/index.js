require('dotenv').config();

const Express = require(express);
const router = require("express").Router();
router.use(Express.json())

const sequelize = require("./db");
//const users = require("./controllers/index");

const path = require("path");
const apiRoutes = require("../server/routes/api");

let user = require("./controllers/UsersController");
let book = require("./controllers/booksController");
let notes = require("./controllers/notesController");

//let expressApplicationObject = Express().use('*', cors());
//expressApplicationObject.use(Express.json());
// var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();
// expressApplicationObject.use(require('../server/middleware/headers'));

sequelize.sync(); 

// expressApplicationObject.post("/challenge", (request, response) => {
//     let data = request.body;
//     let message = data.age >= 18 ? `${ data.name }, you are an adult!` : `${ data.name }, you will be an adult eventually!`;


//     response.send(message);
// });

//************* 
// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});
// **************


// Startup Procedure:
// Verify the connection to the Postgres DB
// Synchronize our Database with our Models
// Listen on our specified port
router.use(require('./middleware/headers'));
router.use('/user', user);
// This is where validate session goes
router.use('/book', book);

router.use('/notes', notes);

//  sequelize.authenticate()
//   .then((error) => {
//       console.log("made it to here")
//       //sequelize.sync()
//   }).catch(function (err) {
//     console.log(err);
// });
//  .then(() => {
    
    //console.log("1*");

    // router.listen(9001, () => {
    //     console.log("[server]: App is listening on port 9001");
    // });

    router.listen(process.env.PORT, () => {
        console.log(`server is listening on port ${process.env.PORT}`)
    })

//  })
//  .catch((err) => {
//      console.log(err)
//  });

