const helpers = require('../../helpers')

const User = require('../users/model')

const authControllers = {
  //////////////////////////////////////////////////////////////////////////////
  // GET TOKEN
  isAuthenticated: async (req, res, next) => {
    try {
      // Get the token in headers of Authorization
      // Authorization: Bearer {this_is_the_token}
      const token = req.headers.authorization.split(' ')[1]
      const decoded = await helpers.verifyToken(token)

      // the token will be saved somewhere soon
      // in testing, you can save it in Postman configuration
      // in frontend app, you can save it in Redux store/state

      // we put the token and decoded in request object
      // so it can be accessed by other middlewares
      req.token = token
      req.decoded = decoded

      // go to next middleware
      next()
    } catch (error) {
      // If failed to get the token
      res.send({
        message: 'Token is not exist in headers of Authorization'
      })
    }
  },

  //////////////////////////////////////////////////////////////////////////////
  // CHECK IF USER ALREADY EXIST
  isUserExist: async (req, res, next) => {
    const user = User.findOne(
      { email: req.body.email },
      { salt: 0, password: 0 }
    )

    // if user does not exist, you can continue
    if (!user) {
      next()
    } else {
      res.send({
        message: 'User is already exist with that email!'
      })
    }
  }
}

module.exports = authControllers
