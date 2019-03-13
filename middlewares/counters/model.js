const mongoose = require('../../config/mongoose')

// Counter schema
const UserSchema = mongoose.Schema({
  id: String,
  seq: Number
})

// Counter model => users collection
const Counter = mongoose.model('Counter', UserSchema)

module.exports = Counter
