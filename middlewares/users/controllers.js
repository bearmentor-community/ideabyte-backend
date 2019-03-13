const User = require('./model')
const Counter = require('../counters/model')

const helpers = require('../../helpers')

const usersControllers = {
  //////////////////////////////////////////////////////////////////////////////
  // REGISTER NEW USER
  register: async (req, res) => {
    // using encryptPassword is a slow process, so we use await
    // then destructure salt & password from encryptPassword() returned value
    const { salt, encryptedPassword } = await helpers.encryptPassword(
      req.body.password
    )

    // creating an object is a fast process
    const newUser = {
      name: req.body.name, // from body
      email: req.body.email, // from body
      salt: salt, // NOT from body, from helpers
      password: encryptedPassword // NOT from body, from helpers
    }
    // creating a user in the database is a slow process
    const result = await User.create(newUser)

    // responding is a fast process
    res.send({
      message: 'Register',
      newUser: {
        name: newUser.name,
        email: newUser.email
      },
      result: {
        ...result._doc,
        salt: 'HIDDEN',
        password: 'HIDDEN'
      }
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // LOGIN WITH REGISTERED USER
  login: async (req, res) => {
    // get email & password from body
    const user = {
      email: req.body.email,
      password: req.body.password
    }

    // search for matched user's email
    const foundUser = await User.findOne(
      { email: user.email } // search for email
    )

    // only continue if user is found
    if (foundUser) {
      // slow process to determine password is matched
      // authenticated result is either true or false
      const authenticated = await helpers.comparePassword(
        user.password,
        foundUser.password
      )

      // create token with JWT
      const token = await helpers.createToken(foundUser)

      res.send({
        message: 'Login with registered user',
        token: token,
        user: {
          name: foundUser.name,
          email: foundUser.email
        }
      })
    } else {
      res.send({
        message: 'Login failed because user is not found'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // LOGOUT WITH LOGGED IN USER
  logout: async (req, res) => {
    res.send({
      message: 'Logged out the user'
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET PROFILE BY AUTHENTICATED/AUTHORIZED USER
  getProfile: async (req, res) => {
    // You have to put the token in Authorization: Bearer {token}

    // token is retrieved in previous middleware via auth.isAuthenticated
    // check in middlewares/users/index.js when router.get('/profile')
    const token = req.token
    // get the decodedUser object as well
    const decodedUser = req.decoded

    // check if the decodedUser.sub, the user _id, is exist
    // decodedUser.sub = '5c6fd1eb739522a11e19923e'
    if (decodedUser.sub) {
      const user = await User.findById(decodedUser.sub, {
        salt: 0,
        password: 0
      })

      res.send({
        message: 'Get my profile',
        tokenIsExist: true,
        decodedUser: decodedUser,
        userIsFound: Boolean(user),
        user: user
      })
    } else {
      res.send({
        message: 'Token is invalid'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET ALL USERS
  getAllUsers: async (req, res) => {
    const users = await User.find({}, { salt: 0, password: 0 })

    res.send({
      message: 'Get all users',
      users: users
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET ONE USER BY ID
  getOneUserById: async (req, res) => {
    const user = await User.findOne(
      { id: req.params.id },
      { salt: 0, password: 0 }
    )

    res.send({
      message: 'Get one user by id',
      user: user
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // DELETE ALL USERS
  deleteAllUsers: async (req, res) => {
    // only Administrator who can delete all users
    if (req.decoded.name === 'Administrator') {
      const result = await User.remove({})
      res.send({
        message: 'Delete all users',
        result: result
      })
    } else {
      res.send({
        message: 'You are not authorized to delete all users'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // DELETE ONE USER BY ID
  deleteOneUserById: async (req, res) => {
    const userFound = await User.findOne({ id: Number(req.params.id) })

    // the user has to be found first
    if (userFound) {
      const user = await User.findOneAndRemove(
        { id: Number(req.params.id) },
        { select: { salt: 0, password: 0 } } // prevent showing the secret
      )

      res.send({
        message: 'Delete one user by id',
        user: user
      })
    } else {
      res.send({
        message: 'User is not found'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // UPDATE ONE USER BY ID
  updateOneUserById: async (req, res) => {
    const userFound = await User.findOne({ id: Number(req.params.id) })

    // the user has to be found first
    if (userFound) {
      // create updatedUser from all the keys in request body
      const updatedUser = { ...req.body }

      const user = await User.findOneAndUpdate(
        { id: Number(req.params.id) },
        { $set: updatedUser }, // set with new data
        {
          new: true, // show the latest update
          select: { salt: 0, password: 0 } // prevent showing the secret
        }
      )

      res.send({
        message: 'Update one user by id',
        user: user
      })
    } else {
      res.send({
        message: 'User is not found'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // SEED ADMIN USER
  seedAdminUser: async (req, res, next) => {
    const isCollectionExist = await User.findOne({ username: 'admin' })

    // drop existing collection if collection is already exist
    if (isCollectionExist) {
      await User.collection.drop()
      await Counter.findOneAndUpdate(
        { id: 'users_counter' },
        { $set: { seq: 0 } }
      )
    }

    // continue to seed
    if (req.key === 'PLEASE_SEED_USERS' && !isCollectionExist) {
      const admin = {
        name: 'Administrator',
        username: 'admin',
        email: 'admin@admin.com',
        password: 'admin'
      }

      const { salt, encryptedPassword } = await helpers.encryptPassword(
        admin.password
      )
      const newUser = {
        name: admin.name,
        username: admin.username,
        email: admin.email,
        salt: salt,
        password: encryptedPassword
      }
      await User.create(newUser)

      next()
    } else {
      res.status(401).send({
        message: 'You are not allowed/authorized to seed users!'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // SEED USERS
  seedUsers: async (req, res) => {
    if (req.key === 'PLEASE_SEED_USERS') {
      const seedUsersData = [
        {
          name: 'Alpha',
          username: 'alpha',
          email: 'alpha@alpha.com',
          password: 'alpha'
        },
        {
          name: 'Beta',
          username: 'beta',
          email: 'beta@beta.com',
          password: 'beta'
        },
        {
          name: 'Gamma',
          username: 'gamma',
          email: 'gamma@gamma.com',
          password: 'gamma'
        }
      ]

      // do not use User.insertMany(dummyUsersData)
      // because we have to encrypt the password as well
      await seedUsersData.forEach(async userData => {
        const { salt, encryptedPassword } = await helpers.encryptPassword(
          userData.password
        )
        const newUser = {
          name: userData.name,
          email: userData.email,
          salt: salt,
          password: encryptedPassword
        }
        await User.create(newUser)
      })

      res.status(200).send({
        message: 'Seed initial users completed'
      })
    } else {
      res.status(401).send({
        message: 'You are not allowed/authorized to seed users!'
      })
    }
  }
}

module.exports = usersControllers
