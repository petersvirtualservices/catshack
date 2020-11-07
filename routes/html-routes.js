const app = express();

app.get('/', (req,res) => {
    res.sendFile('build/index.html');
  });
