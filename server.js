const express = require('express')
const next = require('next')
const routes = require('./routes')
// const books = require('./api/books')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()
const handler = routes.getRequestHandler(app)

app.prepare()
.then(() => {
  const server = express()
  server.use(handler)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> 🚀  Ready on http://localhost:3000')
  })
})
