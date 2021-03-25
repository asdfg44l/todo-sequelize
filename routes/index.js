const express = require('express')
const router = express.Router()

//modules
const Home = require('./modules/home')
const User = require('./modules/users')
const Todo = require('./modules/todos')

//add in router
router.use('/', Home)
router.use('/users', User)
router.use('/todos', Todo)

module.exports = router