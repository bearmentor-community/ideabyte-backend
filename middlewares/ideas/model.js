const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

// Idea schema
const IdeaSchema = mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  datetime: Date,
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
