const mongoose = require('mongoose');
//var bcrypt = require('bcryptjs');
const axios = require('axios');

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
  firstName: String,
  lastName: String,
  email: String,
  password: String
});
const UserModel = mongoose.model('Users', userSchema);

module.exports = (app) => {
  app.post('/userDatabaseSave', (req, res) => {
    console.log(req)

    //var salt = bcrypt.genSaltSync(10);
    //var hash = bcrypt.hashSync("B4c0/\/", salt);
    const username = req.body.username;
    const personalityLabel = req.body.catpersonality;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.email;
    var doc1 = new UserModel({ username: username, catpersonality: personalityLabel, firstName: firstName, lastName: lastName, email: email, password: password });
    doc1.save(function (err, doc) {
      if (err) return console.error(err);
      console.log("Document inserted successfully!");
    });
    res.json({ status: "success" });
  });

  app.get('/api/petfinderget', async (req, res) => {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.PET_FINDER_KEY);
    params.append("client_secret", process.env.PET_FINDER_SECRET);
    const tokenResponse = await axios({
      method: 'post',
      url: "https://api.petfinder.com/v2/oauth2/token",
      data: {
        client_id: process.env.PET_FINDER_KEY,
        client_secret: process.env.PET_FINDER_SECRET,
        grant_type: 'client_credentials'
      }
    });
    const petResults = await axios.get(
      "https://api.petfinder.com/v2/animals?type=cat;location=66215;",
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      }
    );
    return res.json(petResults.data);
  })

  app
    .route('/')
    .get((req, res) => {
      res.sendFile('./client/build/index.html', { root: '.' })
    })

  return app
}


