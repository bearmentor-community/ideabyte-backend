const express = require('express')
const router = express.Router()

const ideas = require('./functions')

// (GET) Get all ideas
// (GET) Search for ideas via query
router.get('/ideas', ideas.getAllIdeas)

// (POST) Create new idea
router.post('/ideas', ideas.createNewIdea)

// (DELETE) Delete all ideas
router.delete('/ideas', ideas.deleteAllIdeas)

// (DELETE) Delete one idea by id
router.delete('/ideas/:id', ideas.deleteOneIdeaById)

// (PUT) Update one idea by id
router.put('/ideas/:id', ideas.updateOneIdeaById)

module.exports = router
