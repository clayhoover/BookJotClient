const Express = require('express');
var bodyParser = require('body-parser')

const applicationSequelizeObject = require("./db");
const applicationControllers = require("./controllers/index");

const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

const expressApplicationObject = new Express();
var jsonParser = bodyParser.json()

expressApplicationObject.use('/test', applicationControllers.test);
expressApplicationObject.use('/users', applicationControllers.users);

expressApplicationObject.get('/', (request, response) => {
    console.log('[server]: Root GET request recieved');
    console.log('TYPE:', request.method);
    console.log('URL:', request.url);
    console.log("[server]: Response being dispatched ->");
    response.send('Root Route Hit, hello from the BookJot Server');
});


expressApplicationObject.post("/challenge", (request, response) => {
    let data = request.body;
    let message = data.age >= 18 ? `${ data.name }, you are an adult!` : `${ data.name }, you will be an adult eventually!`;


    response.send(message);
});

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});



// Startup Procedure:
// Verify the connection to the Postgres DB
// Synchronize our Database with our Models
// Listen on our specified port


 applicationSequelizeObject.authenticate()
  .then((error) => {
      console.log("made it to here")
      applicationSequelizeObject.sync()
  }).catch(function (err) {
    console.log("SOMETHING DONE GOOFED");
});
//  .then(() => {
    
    console.log("1*");
    expressApplicationObject.listen(9001, () => {
        console.log("[server]: App is listening on port 9001");
    });
//  })
//  .catch((err) => {
//      console.log(err)
//  });

