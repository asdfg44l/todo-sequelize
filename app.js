const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const route = require('./routes')

const app = express()
const PORT = 8080

//set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
//methodOverride
app.use(methodOverride('_method'))


//route
app.get('/', (req, res) => {
  res.render('index')
})

app.use(route)

app.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`)
})

