const express = require('express')
const next = require('next')
const passport = require('passport')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './frontend', dev })
const handle = app.getRequestHandler()
console.log('===== DEV MODE: ' + dev + ' =====')

require('./middleware/passport')
const authRouter = require('./routes/auth')
const apiRouter = require('./routes/api')

var bodyParser = require('body-parser')

app.prepare()
  .then(() => {
    let server = express()

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.use('/', authRouter(app, server))
    server.use('/api', passport.authenticate('jwt', { session: false }), apiRouter)

    server.get('/dashboard', (req, res) => {
      return app.render(req, res, '/dashboard', req.query)
    })

    server.get('/tokens', (req, res) => {
      return app.render(req, res, '/tokens', req.query)
    })

    // server.get('/tokens/:id', (req, res) => {
    //   return app.render(req, res, '/tokens', { id: req.params.id })
    // })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
