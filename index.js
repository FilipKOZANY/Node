const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const fs = require('fs')
const score = fs.readFileSync('score.txt', 'utf-8');
app.post('/score', (req, res) => {
  const { nickname } = req.body
  const scores = []
  
  for (let i = 0; i < 5; i++) {
    scores.push(Math.floor(Math.random() * 100) + 1)
  }
  
  const average = scores.reduce((a, b) => a + b) / scores.length
  const data = `${nickname}: ${average}\n`
  
  fs.appendFile('leaderboard.txt', data, (err) => {
    if (err) throw err
    console.log('Score saved!')
  })
  
  res.send(`Your score is ${average}`)
})
app.get('/scores', (req, res) => {
  const fs = require('fs');
  const score = fs.readFileSync('score.txt', 'utf-8');
  res.render('scores', { score: score });
});
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const prezdivka = req.body.prezdivka;
  const score = Math.floor(Math.random() * 100) + 1;
  const data = `${prezdivka}: ${score}\n`;
  fs.appendFileSync('score.txt', data);
  res.redirect('/scores');
});

app.listen(3000, () => {
  console.log('Server běží na portu 3000');
});
app.get('/scores', (req, res) => {
  const fs = require('fs');
})
app.post('/submit-score', (req, res) => {
  // zpracování a zápis skóre do souboru
  
  res.redirect('/scores');
});
app.get('/scores', (req, res) => {
  fs.readFile('scores.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Nastala chyba při čtení souboru se skóre.');
      return;
    }

    const scores = JSON.parse(data);

    res.render('scores', { scores: scores });
  });
});
