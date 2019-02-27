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
    res.send({
      message: ''
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
