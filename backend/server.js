console.log('===== ECW ENV: ' + process.env.ECW_ENV + ' =====')

const os = require('os')
const express = require('express')
const next = require('next')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const port = parseInt(process.env.PORT, 10) || 3000
const dev= process.env.ECW_ENV !== 'production'
const app = next({ dir: './frontend', dev })
const handle = app.getRequestHandler()

require('./middleware/passport')
const indexRouter = require('./routes/')
const authRouter = require('./routes/auth')
const apiRouter = require('./routes/api')

const cors = require('cors')

app.prepare()
  .then(() => {
    let server = express()

    server.use(cors())
    server.use(cookieParser())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.use('/', indexRouter(app, server))
    server.use('/auth', authRouter(app, server))
    server.use('/api', passport.authenticate('jwt', { session: false }), apiRouter)
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.get('/_check', (req, res) => {
      res.status(200)
      return res.send('200 OK')
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://${os.hostname}:${port}`)
    })
  })
