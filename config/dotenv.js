module.exports = {
  loadEnv: function () {
    if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config()
    }
  }
}
