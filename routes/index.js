const express = require('express')
const router = express.Router()

//modules
const Home = require('./modules/home')
const User = require('./modules/users')

//add in router
router.use('/', Home)
router.use('/users', User)

module.exports = router