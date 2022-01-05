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


module.exports = app; 