const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const session = require('express-session')
const PgSession = require('connect-pg-simple')(session)
const methodOverride = require('method-override')
const config = require('./config')
const passport = require('passport')
const db = require('./db')
require('./config/passport')(passport, db)

const loginRouter = require('./routes/login')(passport)

let app = express()
let pool = db.pool

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use(session({
  store: new PgSession({pool}),
  secret: config.session_secret,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/', express.static(path.join(config.root, 'public')))

// routes
app.use('/', loginRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
