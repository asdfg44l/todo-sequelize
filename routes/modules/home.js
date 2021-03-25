const express = require('express')
const router = express.Router()

const { Todo } = require('../../models')

//首頁
router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then(todos => res.render('index', { todos }))
    .catch(err => console.log(err))
})

module.exports = router