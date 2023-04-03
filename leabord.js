app.get('/leaderboard', (req, res) => {
    fs.readFile('leaderboard.txt', 'utf8', (err, data) => {
      if (err) throw err
      
      const scores = data.split('\n')
        .filter((score) => score.trim() !== '')
        .map((score) => {
            const [nickname, value] = score.split(': ')
            return { nickname, value: parseFloat(value) }
            })
            .sort((a, b) => b.value - a.value)
            res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Leaderboard</title>
    </head>
    <body>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          ${scores.map((score) => `
            <tr>
              <td>${score.nickname}</td>
              <td>${score.value}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
  </html>
`)
})
})
app.post('/submit-score', (req, res) => {
  const { username, score } = req.body;
  const data = `${username}: ${score}\n`;

  fs.appendFile('scores.txt', data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to submit score');
      return;
    }

    res.send('Score submitted');
  });
});
app.get('/scores', (req, res) => {
  fs.readFile('scores.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to read scores');
      return;
    }

    const scores = data.split('\n').filter(Boolean);

    res.render('scores', { scores });
  });
});
