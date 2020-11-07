const express = require('express');
const mysql = require('mysql');
var session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// initialize the app
const app = express();

// add middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

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


//const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://cpeters:password@cluster0.wstcx.mongodb.net/catshackdatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("catshackdatabase").collection("users");
  // perform actions on the collection object
  client.close();
}); 


mongoose.connect(process.env.MONGOOSE_URI || 'mongodb://localhost/catshack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
* Mongo
**/
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {  
});

/* const orgSchema = new mongoose.Schema({
  name: String,
  organization: String,
  phone: String,
  address: String,
  cats: String,
  catdescriptions: String,
  password: String,
}); */

const userSchema = new mongoose.Schema({
  username: String,
  catpersonality: String,
});   
const UserModel = mongoose.model('User', userSchema);
var doc1 = new UserModel({ username: "test", catpersonality: "test" });


/**
* Routes
**/

/* app.post('/api/save_username', (req, res) => {
  // store the username to the session
  req.session.username = req.body.username;
  res.json({username: req.body.username});
})


app.post('/userDatabaseSave', (req, res) => {
  const username = req.body.username;
  const personalityLabel = req.body.catpersonality;
  var doc1 = new UserModel({ username: username, catpersonality: personalityLabel });
  doc1.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });
  res.json({status: "success"});
});


app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM catshackdatabase';
  db.query(sqlInsert, {name, catchoice}, (err, result) =>{
    res.send(result)
  });
});

app.post('/api/insert', (req, res) =>{
  const nameOne = req.body.name;
  const catChoiceOne = req.body.catchoice;
  const sqlInsert = 'INSERT INTO catshackdatabase (name, catchoice) VALUES (?,?)';
  db.query(sqlInsert, {name, catchoice}, (err, result) =>{
    console.log(result);
  })
});

app.get('/', (req,res) => {
  res.sendFile('build/index.html');
}); */

// specify the port to use
var PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
  console.log('Server listening on: http://localhost:' + PORT);
});