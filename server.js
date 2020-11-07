const express = require('express');
const mysql = require('mysql');
var session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./routes/api');

let app = express();



// add middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

// initialize the app
app = api(app);

// add session middleware
app.set('trust proxy', 1);
app.use(session({
  secret: 'topsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

/* // initialize the db
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'catshackdatabase',
}); */


// specify the port to use
var PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
  console.log('Server listening on: http://localhost:' + PORT);
});