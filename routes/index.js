const express = require('express')
const router = express.Router()

const { isAuthenticate } = require('../middleware/auth')

//modules
const Home = require('./modules/home')
const User = require('./modules/users')
const Todo = require('./modules/todos')
const Auth = require('./modules/auth')

//add in router
router.use('/todos', isAuthenticate, Todo)
router.use('/auth', Auth)
router.use('/users', User)
router.use('/', isAuthenticate, Home)

module.exports = router