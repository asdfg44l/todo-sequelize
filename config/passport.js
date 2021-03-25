const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

//model
const { User } = require('../models')

module.exports = (app) => {
  //初始化
  app.use(passport.initialize());
  app.use(passport.session());

  //本地驗證策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      let user = await User.findOne({ where: { email } })
      if (!user) {
        return done(null, false, { message: '此帳號尚未註冊' })
      }

      const isAuth = await bcrypt.compare(password, user.password)
      if (!isAuth) {
        return done(null, false, { message: '帳號或密碼輸入錯誤' })
      }

      return done(null, user)
    } catch (e) {
      return done(null, false)
    }
  }))

  //序列化
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  //去序列化
  passport.deserializeUser(async (id, done) => {
    try {
      let user = User.findByPk(id)

      return done(null, user)
    } catch (e) {
      return done(e, false)
    }
  })
}