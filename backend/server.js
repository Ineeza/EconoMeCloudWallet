const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './frontend', dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/login', (req, res) => {
      return app.render(req, res, '/b', req.query)
    })

    server.get('/dashboard', (req, res) => {
      return app.render(req, res, '/a', req.query)
    })

    server.get('/tokens/:id', (req, res) => {
      return app.render(req, res, '/tokens', { id: req.params.id })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
