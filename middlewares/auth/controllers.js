const helpers = require('../../helpers')

const authControllers = {
  //////////////////////////////////////////////////////////////////////////////
  // GET TOKEN
  getToken: async (req, res, next) => {
    try {
      // Get the token in headers of Authorization
      // Authorization: Bearer {this_is_the_token}
      const token = req.headers.authorization.split(' ')[1]

      // the token will be saved somewhere soon
      // in testing, you can save it in Postman configuration
      // in frontend app, you can save it in Redux store/state

      // we put the token in request object
      // so it can be accessed by other middleware
      req.token = token

      // go to next middleware
      next()
    } catch (error) {
      // If failed to get the token
      res.send({
        message: 'Token is not exist in headers of Authorization'
      })
    }
  }
}

module.exports = authControllers
