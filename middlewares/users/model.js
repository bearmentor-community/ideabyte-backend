const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

// User schema
const UserSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  salt: String,
  password: String
})

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
UserSchema.plugin(AutoIncrement, {
  id: 'users_counter',
  inc_field: 'id'
})

// User model => users collection
const User = mongoose.model('User', UserSchema)

module.exports = User
