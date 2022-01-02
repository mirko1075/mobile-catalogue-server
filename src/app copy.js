const express = require('express')
const bodyParser = require('body-parser')
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const app = express()
require("dotenv").config();
const port = process.env.PORT 
console.log('port :>> ', port);
// MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//Import DB Connection and functions
const db = require('./db/db_queries.js')

// Catch `next(err)` calls
app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || "500";
    res.status(statusError).json(err);
  }
});


app.get('/api/phones', db.getPhones)
app.get('/api/phones/:id', db.getPhone)
app.post('/api/phones', db.postPhone)
app.put('/api/phones/:id', db.updatePhone)
app.delete('/api/phones/:id', db.deletePhone)

app.use((req, res, next) => {
  // If no previous routes match the request, send back the React app.
  res.sendFile(__dirname + "/public/index.html");
});

// ERROR HANDLING
//  Catch 404 and respond with error message
// Shows a 404 error with a message when no route is found for the request
app.use((req, res, next) => {
  res.status(404).json({ code: "not found" }); // .send( JSON.stringify(  { code: 'not found' }  ) )
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

module.exports = app;