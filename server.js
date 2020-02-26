const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }
    const notes = JSON.parse(data)
    res.json(notes)
  })
})

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (e, data) => {
    if (e) { console.log(e) }
    const notes = JSON.parse(data)
    notes.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(notes), e => {
      if (e) { console.log(e) }
      res.sendStatus(200)
    })
  })
})

app.delete('/api/notes/:title', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (e, data) => {
    if (e) console.log(e)
    const notes = JSON.parse(data)
    const title = req.params.title
    notes.filter(note => note.title !== title)
    fs.writeFile('./db/db.json', JSON.stringify(notes), e => {
      if (e) { console.log(e) }
      res.sendStatus(200)
    })
  })  
})

app.listen(process.env.PORT || 3000)