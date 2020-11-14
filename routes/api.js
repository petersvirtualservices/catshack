const mongoose = require('mongoose');

/**
* Mongo
**/
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
});

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/catshack',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

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
const UserModel = mongoose.model('Users', userSchema);

//nginx does not allow for post requests from static pages
module.exports = (app) => {
  app.post('/userDatabaseSave', (req, res) => {
    console.log(req)
    const username = req.body.username;
    const personalityLabel = req.body.catpersonality;
    var doc1 = new UserModel({ username: username, catpersonality: personalityLabel });
    doc1.save(function (err, doc) {
      if (err) return console.error(err);
      console.log("Document inserted successfully!");
    });
    res.json({ status: "success" });
  });

  app.post('/orgDatabaseSave', (req, res) => {
    console.log(req)
    const name = req.body.name;
    const organization = req.body.organization;
    const phone =req.body.state.phone;
    const address =req.body.state.address;
    const cats =req.body.state.cats;
    const catdescription = req.body.catdescripton;
    const password = req.body.password;
 
    var doc1 = new UserModel({ 
      name: name,
      organization: organization,
      phone: phone,
      address: address,
      cats: cats,
      catdescription: catdescription,
      password: password
    });

    doc1.save(function (err, doc) {
      if (err) return console.error(err);
      console.log("Document inserted successfully!");
    });
    res.json({ status: "success" });

  app.post("/login", (req, res) => {
    console.log(req.body);
  });

  app.post("/register", (req, res) => {
    console.log(req.body);
  });

  app.post("/user", (req, res) => {
    console.log(req.body);
  });

  app.get('/', (req, res) => {
    console.log('hello');
    res.sendFile('./client/public/index.html', { root: '.' })
  });
  return app;
  })}