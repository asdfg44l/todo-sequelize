const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

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
router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }
))

//註冊功能
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  let errors = []
  try {
    let user = await User.findOne({ where: { email } })
    if (user) {
      errors.push({ message: '此電子郵件已被註冊' })
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword,
        errors
      })
    }
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)

    await User.create({ name, email, password: hash, confirmPassword })
    return res.redirect('/')

  } catch (e) {
    console.warn(e)
  }
})

//登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出')
  return res.redirect('/users/login')
})


module.exports = router
