const express = require('express')
const bodyParser = require('body-parser')
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const app = express()
const port = 3000

// MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


//CORS
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost",
      "http://127.0.0.1",
      "http://lmen-confeccion.herokuapp.com",
      "https://lmen-confeccion.herokuapp.com",
    ],
  })
);

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
app.get('/api/phones/:id', db.getPhoneById)
app.post('/api/phones', db.createPhone)
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