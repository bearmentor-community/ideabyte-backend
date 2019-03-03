require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_CONNECTION =
  process.env.MONGODB_URI ||
  `${process.env.DB_URL}/${process.env.DB_NAME}` ||
  `mongodb://localhost:27017/database_name`

mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_CONNECTION, {
  useNewUrlParser: true
})

module.exports = mongoose
