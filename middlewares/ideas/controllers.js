const Idea = require('./model')
const helpers = require('../../helpers')

const ideasControllers = {
  //////////////////////////////////////////////////////////////////////////////
  // GET ALL IDEAS
  getAllIdeas: async (req, res) => {
    // Search for ideas if query is detected
    if (req.query.q) {
      const keyword = req.query.q
      res.send({
        message: 'Search for ideas with keyword',
        keyword: keyword,
        data: await Idea.find({})
      })
    } else {
      // Otherwise just send all the ideas
      res.send({
        message: 'Get all ideas',
        data: await Idea.find({})
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET ONE IDEAS
  getOneIdeaById: async (req, res) => {
    if (req.params.id) {
      const id = req.params.id
      res.send({
        message: 'Get one idea by id',
        id: id,
        data: await Idea.findOne({ id: id })
      })
    } else {
      // Otherwise just send all the ideas
      res.send({
        message: 'I have no any idea'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // CREATE NEW IDEA
  createNewIdea: async (req, res) => {
    // verifying a token is a slow process
    const decodedToken = await helpers.verifyToken(req.token)

    // creating an object is a fast process
    const newIdea = {
      author: decodedToken.sub,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      slug: req.body.slug,
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
  // DELETE ALL IDEAS
  deleteAllIdeas: async (req, res) => {
    res.send({
      message: 'Delete all ideas',
      isEnabled: false
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // DELETE ONE IDEA BY ID
  deleteOneIdeaById: async (req, res) => {
    res.send({
      message: 'Delete one idea by id',
      isEnabled: false
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // UPDATE ONE IDEA BY ID
  updateOneIdeaById: async (req, res) => {
    res.send({
      message: 'Update one idea by id',
      isEnabled: false
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // SEED IDEAS. ONLY WHEN USERS ALREADY EXIST
  seedIdeas: async (req, res) => {
    res.send({
      message: 'Seed dummy ideas',
      isEnabled: false
    })
  }
}

module.exports = ideasControllers
