const Idea = require('./model')
const Counter = require('../counters/model')

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
        items: await Idea.find({})
      })
    } else {
      // Otherwise just send all the ideas
      res.send({
        message: 'Get all ideas',
        items: await Idea.find({})
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET ONE IDEA
  getOneIdeaById: async (req, res) => {
    if (req.params.id) {
      const id = Number(req.params.id)
      res.send({
        message: 'Get one idea by id',
        id: id,
        item: await Idea.findOne({ id: id })
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
  // SEED IDEAS ONLY WHEN AUTHENTICATED & AUTHORIZED
  seedIdeas: async (req, res, next) => {
    const collection = await Idea.find({})

    // drop existing collection if collection is already exist
    if (collection.length > 0) {
      console.log('isCollectionExist')

      await Idea.collection.drop()
      await Counter.findOneAndUpdate(
        { id: 'ideas_counter' },
        { $set: { seq: 0 } }
      )
    }

    // continue to seed
    if (req.key === 'PLEASE_SEED_IDEAS' && collection.length === 0) {
      const seedIdeasData = [
        {
          author: req.decoded.sub,
          title: 'Super Strong Backpack',
          description:
            'A backpack that is super strong, accompanied with an app to track your belongings inside. Marvelous!',
          datetime: '2019-01-01T12:30:45.000Z',
          location: 'Jakarta, Indonesia',
          images: ['/assets/images/picture.jpg', '/assets/images/picture.jpg'],
          details: '<p>Details here. <b>Another thing</b>.</p>'
        },
        {
          author: req.decoded.sub,
          title: 'Tough Notebook Bag',
          description:
            'A durable bag to store your notebook, accompanied with an app to control your notebook via the bag. Modern!',
          datetime: '2019-02-01T12:30:45.000Z',
          location: 'Bandung, Indonesia',
          images: ['/assets/images/picture.jpg', '/assets/images/picture.jpg'],
          details: '<p>Details here. <b>Another thing</b>.</p>'
        }
      ]

      // do not use User.insertMany(dummyUsersData)
      // because we have to encrypt the password as well
      await seedIdeasData.forEach(async newIdea => {
        console.log(newIdea)

        await Idea.create(newIdea)
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
