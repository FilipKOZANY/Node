const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const fs = require('fs')

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