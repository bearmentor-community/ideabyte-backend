const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  // ENCRYPT PASSWORD, RETURN SALT & ENCRYPTED PASSWORD
  encryptPassword: async plainPassword => {
    // generate salt
    const salt = await bcrypt.genSalt(10)
    // hash the plain password with generated salt
    // with becrypt, we have to use the salt
    const encryptedPassword = await bcrypt.hash(plainPassword, salt)

    // return both salt & encryptedPassword as an object
    // will be used in the register middleware
    // both salt & encryptedPassword will be stored in the database
    // but we will NOT store the plainPassword in the database
    return {
      salt,
      encryptedPassword
    }
  },

  // COMPARE ENCRYPTED PASSWORD WITH PLAIN PASSWORD
  comparePassword: async (password, hash) => {
    // slow process to determine password is matched
    // result is either true or false
    const authenticated = await bcrypt.compare(password, hash)

    return authenticated
  },

  // CREATE A NEW TOKEN WITH PAYLOAD sub: _id
  createToken: async foundUser => {
    // create the payload WITHOUT having the salt & password
    const payload = {
      sub: foundUser._id
    }

    // create the token using jwt.sign()
    const token = await jwt.sign(payload, process.env.SECRET)

    // return token to be used later by the frontend
    return token
  },

  // VERIFY TOKEN
  verifyToken: async token => {
    // use try catch to prevent app crashing
    try {
      // verify token with the same secret from backend
      const decoded = await jwt.verify(token, process.env.SECRET)
      // decoded token example:
      // { sub: '5c6fd1eb739522a11e19923e', iat: 1550834260 }

      // return decoded object is fine
      return decoded
    } catch (error) {
      // catch the error if it's happen
      // such as when the token is invalid or decoded is false
      return error
    }
  }
}
