let express = require('express');
let app = express();
const path = require("path");
let morgan = require('morgan');
let bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT 
let phone = require('./routes/phone');

//don't show the log when it is test
if(process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use(cors());

// MIDDLEWARE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => res.json({message: "Welcome to our Mobilestore!"}));

app.route("/api/v1/phones")
    .get(phone.getPhones)
    .post(phone.postPhone);
app.route("/api/v1/phones/:id")
    .get(phone.getPhone)
    .delete(phone.deletePhone)
    .put(phone.updatePhone);

app.use((req, res, next) => {
  // If no previous routes match the request, send back the React app.
  res.status(404).send({message: `Error: No route defined `, status: "error"})
});

// ERROR HANDLING
//  Catch 404 and respond with error message
// Shows a 404 error with a message when no route is found for the request
app.use((req, res, next) => {
  res.status(404).json({ code: "not found" }); // .send( JSON.stringify(  { code: 'not found' }  ) )
});


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing