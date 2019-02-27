require('dotenv').config()
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

mongoose.set('useCreateIndex', true)
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

// User schema
const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  salt: String,
  password: String
})

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
UserSchema.plugin(AutoIncrement, { inc_field: 'users_id' })

// User model => users collection
const User = mongoose.model('User', UserSchema)

module.exports = User
