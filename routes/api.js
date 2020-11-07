const app = express();

app.post('/api/save_username', (req, res) => {
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
  

  