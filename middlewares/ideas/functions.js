const Idea = require('./model')

const ideasFunctions = {
  //////////////////////////////////////////////////////////////////////////////
  // Get all ideas
  getAllIdeas: (req, res) => {
    res.send({
      message: ''
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // Create new idea
  createNewIdea: async (req, res) => {
    // creating an object is a fast process
    const newIdea = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      images: req.body.images,
      details: req.body.details
    }

    // creating in the database is a slow process
    const result = await Idea.create(newIdea)

    // responding is a fast process
    res.send({
      message: 'New idea is created',
      newIdea: newIdea,
      result: result
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // Delete all ideas
  deleteAllIdeas: async (req, res) => {
    res.send({
      message: ''
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // Delete one idea by id
  deleteOneIdeaById: async (req, res) => {
    res.send({
      message: ''
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // Update one idea by id
  updateOneIdeaById: async (req, res) => {
    res.send({
      message: ''
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // Seed ideas. Only when users already exist
  seedIdeas: async (req, res) => {
    res.send({
      message: ''
    })
  }
}

module.exports = ideasFunctions
