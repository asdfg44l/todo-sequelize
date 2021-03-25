const express = require('express')
const router = express.Router()

const { User, Todo } = require('../../models')

//登入畫面
router.get('/login', (req, res) => {
  res.render('login')
})

//註冊畫面
router.get('/register', (req, res) => {
  res.render('register')
})

//登入功能
router.post('/login', (req, res) => {
  console.log('login')
  return
})

//註冊功能
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password, confirmPassword })
    .then(() => res.redirect('/'))
})


module.exports = router
