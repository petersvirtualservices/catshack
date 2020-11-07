
const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/catshack',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

/**
* Mongo
**/
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
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
const UserModel = mongoose.model('Users', userSchema);
//var doc1 = new UserModel({ username: "test", catpersonality: "test" });

//nginx does not allow for post requests from static pages
module.exports = (app) => {
  //console.log(app);
  app.post('/userDatabaseSave', (req, res) => {
    console.log(req)
    const username = req.body.username;
    const personalityLabel = req.body.catpersonality;
    var doc1 = new UserModel({ username: username, catpersonality: personalityLabel });
    doc1.save(function (err, doc) {
      if (err) return console.error(err);
      console.log("Document inserted succussfully!");
    });
    res.json({ status: "success" });
  });

  app.get('/', (req, res) => {
    console.log('text');
    res.sendFile('./build/index.html');
  });
  return app;
}