const env =
    (process.env.ECW_ENV === undefined || process.env.ECW_ENV === '')
      ? 'local' : process.env.ECW_ENV

const express = require('express')
const next = require('next')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const front = next({ dev: env === 'local', dir: './frontend' })
const handle = front.getRequestHandler()

require('./middleware/passport')
const indexRouter = require('./routes/')
const authRouter = require('./routes/auth')
const apiRouter = require('./routes/api')

let app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter(front, app))
app.use('/auth', authRouter(front, app))
app.use('/api', passport.authenticate('jwt', { session: false }), apiRouter(front, app))
app.get('/_check', (req, res) => {
  res.status(200)
  return res.send('200 OK')
})
// Use wildcard routing in the end of lines
app.get('*', (req, res) => {
  return handle(req, res)
})

module.exports = {
  app: app,
  front: front
}
