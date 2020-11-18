const mongoose = require('mongoose');

/**
* Mongo
**/

const mongoConnect = "mongodb+srv://cpeters123:uu51LxvHpBDgHorW@cluster0.wstcx.mongodb.net/catshackdatabase?retryWrites=true&w=majority";
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
});

mongoose.connect(
  process.env.MONGODB_URI || mongoConnect,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const userSchema = new mongoose.Schema({
  username: String,
  catpersonality: String,
});
const UserModel = mongoose.model('Users', userSchema);

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

  app
    .route('/')
    .get((req, res) => {
      res.sendFile('./client/public/index.html', { root: '.' })
    })
 
  return app
}