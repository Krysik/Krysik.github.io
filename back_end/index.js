const express = require('express');
const fs = require('fs');
const cors = require('cors');


const app = express()

app.use(cors())


app.get('/generate', (req, res) => {
  const randomWord = fs.readFileSync('../dictionary/slowa.txt', 'utf8' ,(err, data) => {
    if(err) throw err
    return data
  })
  const splited = randomWord.trim().split('\n');
  const random = splited[Math.floor(Math.random()*splited.length)]

  const objToExport = {
    word: random
  }
  res.json(objToExport)
})


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
