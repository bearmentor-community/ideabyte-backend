const mongoose = require('../../config/mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

// Idea schema
const IdeaSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      index: true
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      index: true
    },
    datetime: {
      type: Date,
      default: Date.now
    },
    location: String,
    slug: String,
    images: [
      {
        type: String
      }
    ],
    details: {
      type: String,
      required: true,
      index: true
    },
    tags: [
      {
        type: String,
        index: true
      }
    ]
  },
  { timestamps: true }
)

IdeaSchema.index(
  {
    title: 'text',
    description: 'text',
    location: 'text',
    details: 'text'
  },
  {
    weights: {
      title: 4,
      description: 3,
      details: 2,
      location: 1
    }
  }
)

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
