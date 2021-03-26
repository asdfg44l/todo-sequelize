const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

//model
const { User } = require('../models')

module.exports = (app) => {
  //初始化
  app.use(passport.initialize());
  app.use(passport.session());

  //本地驗證策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
      let user = await User.findOne({ where: { email } })
      if (!user) {
        return done(null, false, req.flash('warning_msg', '此帳號尚未註冊'))
      }

      const isAuth = await bcrypt.compare(password, user.password)
      if (!isAuth) {
        return done(null, false, req.flash('warning_msg', '帳號或密碼輸入錯誤'))
      }

      return done(null, user)
    } catch (e) {
      return done(null, false)
    }
  }))

  //Facebook 驗證策略
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['email', 'displayName']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, name } = profile._json;
        console.log(profile._json)
        let user = await User.findOne({ where: { email } })
        if (user) {
          return done(null, user)
        }

        const randomPassword = Math.random().toString(36).slice(-8)
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(randomPassword, salt)

        let new_user = await User.create({ name, email, password: hash })

        return done(null, new_user)
      } catch (e) {
        return done(err, false)
      }
    }
  )
  )

  //序列化
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  //去序列化
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findByPk(id)

      return done(null, user.toJSON())
    } catch (e) {
      return done(e, false)
    }
  })
}