// Ejercicio 1: crear servidor HTTP con Node

const http = require('node:http')
const fs = require('node:fs')

const port = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  const { url, method } = req

  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  switch (method) {
    case 'GET': {
      if (url === '/') {
        res.end('<h1>¡Hola mundo!</h1>')
      } else if (url === '/logo.webp') {
        fs.readFile('./assets/logo.webp', (err, data) => {
          if (err) {
            res.statusCode = 500
            res.end('<h1>500 Internal Server Error</h1>')
          } else {
            res.setHeader('Content-Type', 'image/webp')
            res.end(data)
          }
        })
      } else if (url === '/404') {
        res.statusCode = 404
        res.end('<h1>404</h1>')
      } else {
        res.statusCode = 404
        res.end()
      }

      break
    }

    case 'POST': {
      if (url === '/contacto') {
        let body = ''

        req.on('data', chunck => {
          body += chunck.toString()
        })

        req.on('end', () => {
          const data = JSON.parse(body)
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 201
          res.end(JSON.stringify(data))
        })
      } else {
        res.statusCode = 405
        res.end()
      }

      break
    }

    default: {
      res.statusCode = 405
      res.end()
    }
  }
}

const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`)
})

function startServer () {
  return server
}

module.exports = {
  startServer
}
