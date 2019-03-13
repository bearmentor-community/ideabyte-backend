const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

// Idea schema
const IdeaSchema = mongoose.Schema({
  author: String,
  title: String,
  description: String,
  date: Date,
  location: String,
  slug: String,
  images: [
    {
      type: String
    }
  ],
  details: String
})

// plug the AutoIncrement plugin into the schema to create auto incremented id
// id is different with _id
// inc_field is to track which id to increment
IdeaSchema.plugin(AutoIncrement, {
  id: 'ideas_counter',
  inc_field: 'id'
})

// Idea model => ideas collection
const Idea = mongoose.model('Idea', IdeaSchema)

module.exports = Idea
