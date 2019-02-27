const express = require('express')
const router = express.Router()

const users = require('./controllers')
const auth = require('../auth/controllers')

// (POST) Register new user
router.post('/register', users.register)

// (POST) Login to user
router.post('/login', users.login)

// (GET) Get user profile
router.get('/profile', auth.getToken, users.getProfile)

// (GET) Get one user by id
router.get('/:id', users.getOneUserById)

// (GET) Get all users
router.get('/', users.getAllUsers)

// (DELETE) Delete all users
router.delete('/', users.deleteAllUsers)

// (DELETE) Delete one user by id
router.delete('/:id', users.deleteOneUserById)

// (PUT) Update one user by id
router.put('/:id', users.updateOneUserById)

module.exports = router
