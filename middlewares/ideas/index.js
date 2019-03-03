const express = require('express')
const router = express.Router()

const ideas = require('./controllers')
const auth = require('../auth/controllers')

// (GET) Get all ideas
// (GET) Search for ideas via query
router.get('/', ideas.getAllIdeas)

// (GET) Get one idea
router.get('/:id', ideas.getOneIdeaById)

// (POST) Create new idea
router.post('/', auth.getToken, ideas.createNewIdea)

// (DELETE) Delete all ideas
router.delete('/', ideas.deleteAllIdeas)

// (DELETE) Delete one idea by id
router.delete('/:id', ideas.deleteOneIdeaById)

// (PUT) Update one idea by id
router.put('/:id', ideas.updateOneIdeaById)

module.exports = router
