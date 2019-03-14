const Idea = require('./model')
const User = require('../users/model')
const Counter = require('../counters/model')

const helpers = require('../../helpers')

const ideasControllers = {
  //////////////////////////////////////////////////////////////////////////////
  // GET ALL IDEAS
  getAllIdeas: async (req, res) => {
    res.send({
      message: 'Get all ideas',
      ideas: await Idea.find({}).populate('author', '-password -salt')
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // SEARCH IDEAS WITH QUERY
  searchIdeas: async (req, res) => {
    if (req.query.q) {
      // get the keyword from 'q' query
      const keyword = req.query.q

      // find the ideas either exact match word OR regex match
      const ideas = await Idea.find({
        $or: [
          {
            $text: {
              $search: keyword // by index
            }
          },
          {
            // or search for the title
            title: {
              $regex: keyword, // by regex
              $options: 'i' // case insensitive
            }
          },
          {
            // or search for the description
            description: {
              $regex: keyword, // by regex
              $options: 'i' // case insensitive
            }
          },
          {
            // or search for the details
            details: {
              $regex: keyword, // by regex
              $options: 'i' // case insensitive
            }
          }
        ]
      }).populate('author', '-password -salt')

      res.send({
        message: 'Search for ideas with keyword',
        keyword: keyword,
        ideas: ideas
      })
    } else {
      res.send({
        message: 'Search requires a query!',
        format: '/ideas/search?q=keyword'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET ONE IDEA
  getOneIdeaById: async (req, res) => {
    if (req.params.id) {
      const id = Number(req.params.id)
      const idea = await Idea.findOne({ id: id }).populate(
        'author',
        '-password -salt'
      )

      res.send({
        message: 'Get one idea by id',
        id: id,
        idea: idea
      })
    } else {
      // Otherwise just send all the ideas
      res.send({
        message: 'I have no any idea with that id ;)',
        id: id
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
    const resultIdea = await Idea.create(newIdea)

    const resultUser = await User.findOneAndUpdate(
      { _id: decodedToken.sub },
      { $push: { ideas: resultIdea._id } },
      { new: true }
    )

    // responding is a fast process
    res.send({
      message: 'New idea is created',
      newIdea: newIdea,
      resultIdea: resultIdea,
      resultUser: resultUser
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
  // SEED IDEAS ONLY WHEN AUTHENTICATED & AUTHORIZED
  seedIdeas: async (req, res, next) => {
    const collection = await Idea.find({})

    // drop existing collection if collection is already exist
    if (collection.length > 0) {
      await Idea.collection.drop()
      await Counter.findOneAndUpdate(
        { id: 'ideas_counter' },
        { $set: { seq: 0 } }
      )

      res.status(200).send({
        message: 'All ideas and its counter have been dropped'
      })
    } else if (req.key === 'PLEASE_SEED_IDEAS' && collection.length === 0) {
      // get seed data from other file
      const seedIdeasData = require('./seed')

      // do not use User.insertMany(dummyUsersData)
      // because we have to encrypt the password as well
      await seedIdeasData.forEach(async newIdea => {
        await Idea.create({
          ...newIdea,
          author: req.decoded.sub
        })
      })

      res.status(200).send({
        message: 'Seed initial ideas completed'
      })
    } else {
      res.status(401).send({
        message: 'You are not allowed/authorized to seed users!'
      })
    }
  }
}

module.exports = ideasControllers
