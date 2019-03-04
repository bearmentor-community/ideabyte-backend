require('dotenv').config()

const express = require('express')
const cors = require('cors')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// //////////////////////////////////////////////////////////////////////////////

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// //////////////////////////////////////////////////////////////////////////////

const indexMiddleware = require('./middlewares')
const usersMiddleware = require('./middlewares/users')
const ideasMiddleware = require('./middlewares/ideas')

app.use('/', indexMiddleware)
app.use('/users', usersMiddleware)
app.use('/ideas', ideasMiddleware)

// //////////////////////////////////////////////////////////////////////////////

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
  res.send({
    error: err
  })
})

module.exports = app
