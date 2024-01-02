// Ejercicio 2: crear servidor HTTP con Express

const express = require('express')
const fs = require('node:fs')

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(express.static('assets'))

const port = process.env.PORT ?? '1234'

app.all('/', (req, res) => {
  const { method } = req
  if (method === 'GET') {
    res.send('<h1>¡Hola mundo!</h1>')
  } else {
    res.status('405').send()
  }
})

app.get('/404', (req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.get('/logo.webp', (req, res) => {
  fs.readFile('./assets/logo.webp', (err, data) => {
    if (err) {
      res.status(500).send('<h1>500 Internal Server Error</h1>')
    } else {
      res.send(data)
    }
  })
})

app.post('/contacto', (req, res) => {
  const { body } = req
  res.status(201).json(body)
})

app.use((req, res) => {
  res.status(405).send()
})

function startServer () {
  const server = app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })

  return server
}

module.exports = {
  startServer
}
