const User = require('./model')
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
      newUser: newUser,
      result: result
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
  },

  //////////////////////////////////////////////////////////////////////////////
  logout: async (req, res) => {
    res.send({
      message: 'Logged out the user'
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  // GET PROFILE BY AUTHENTICATED/AUTHORIZED USER
  // You have to put the token (such as: )
  getProfile: async (req, res) => {
    // token is retrieved in previous request via auth.getToken function
    // check in middlewares/users/index.js when router.get('/profile')
    const token = req.token

    // get the decodedUser object after the Authorization token is verified
    const decodedUser = await helpers.verifyToken(token)

    // check if the decodedUser.sub, the user _id, is exist
    // decodedUser.sub = '5c6fd1eb739522a11e19923e'
    if (decodedUser.sub) {
      const foundUser = await User.findById(decodedUser.sub, {
        salt: 0,
        password: 0
      })

      res.send({
        message: 'Get my profile',
        tokenIsExist: true,
        decodedUser: decodedUser,
        foundUser: foundUser
      })
    } else {
      res.send({
        message: 'Token is invalid'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  getAllUsers: async (req, res) => {
    res.send({
      message: 'Get all users',
      users: await User.find({}, { salt: 0, password: 0 })
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  getOneUserById: async (req, res) => {
    res.send({
      message: 'Get one user by id',
      users: await User.findOne({ id: req.params.id }, { salt: 0, password: 0 })
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  deleteAllUsers: async (req, res) => {
    res.send({
      message: 'Delete all users',
      isEnabled: false
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  deleteOneUserById: async (req, res) => {
    res.send({
      message: 'Delete one user by id',
      isEnabled: false
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  updateOneUserById: async (req, res) => {
    res.send({
      message: 'Update one user by id',
      isEnabled: false
    })
  },

  //////////////////////////////////////////////////////////////////////////////
  seedUsers: async (req, res) => {
    const dummyUsersData = [
      {
        name: 'Alpha',
        email: 'alpha@gmail.com',
        password: 'password_alpha'
      },
      {
        name: 'Beta',
        email: 'beta@gmail.com',
        password: 'password_beta'
      },
      {
        name: 'Gamma',
        email: 'gamma@gmail.com',
        password: 'password_gamma'
      }
    ]

    // do not use User.insertMany(dummyUsersData)
    // because we have to encrypt the password
    await dummyUsersData.forEach(async userData => {
      await usersMiddleware.register(userData)
    })

    res.send({
      message: 'Seed dummy users completed'
    })
  }
}

module.exports = usersControllers
