const express = require('express');
//const mysql = require('mysql');
var session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./routes/api');
const passport = require('passport');
const passportlocal = require('passport-local');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

let app = express();

// add middleware
//app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"))
}

app.get("*", (req, res) =>
    res.sendFile(path.resolve("build", "index.html"))
  );
}

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

app.use(cookieParser("topsecret"))

// specify the port to use
var PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log('Server listening on: http://localhost:' + PORT);
});