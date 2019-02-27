require('dotenv').config()
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

mongoose.set('useCreateIndex', true)
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

// Idea schema
const IdeaSchema = mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  author: String,
  date: Date,
  location: String,
  slug: String,
  images: [
    {
      type: String
    }
  ],
  detail: String
})

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
IdeaSchema.plugin(AutoIncrement, { inc_field: 'ideas_id' })

// Idea model => ideas collection
const Idea = mongoose.model('Idea', IdeaSchema)

module.exports = Idea
