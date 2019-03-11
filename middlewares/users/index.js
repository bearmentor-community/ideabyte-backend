const express = require('express')
const router = express.Router()

const users = require('./controllers')
const auth = require('../auth/controllers')

// (POST) Register new user
router.post('/register', auth.isUserExist, users.register)

// (POST) Login to user
router.post('/login', users.login)

// (GET) Logout from user
router.get('/logout', users.logout)

// (POST) Seed new users
router.post('/seed', auth.isAuthenticated, users.seedUsers)

// (GET) Get user profile
router.get('/profile', auth.isAuthenticated, users.getProfile)

// (GET) Get one user by id
router.get('/:id', users.getOneUserById)

// (GET) Get all users
router.get('/', users.getAllUsers)

// (DELETE) Delete all users
router.delete('/', auth.isAuthenticated, users.deleteAllUsers)

// (DELETE) Delete one user by id
router.delete('/:id', auth.isAuthenticated, users.deleteOneUserById)

// (PUT) Update one user by id
router.put('/:id', auth.isAuthenticated, users.updateOneUserById)

module.exports = router
