const express = require('express')
const router = express.Router()

const { Todo } = require('../../models')

//首頁
router.get('/', (req, res) => {
  const user_id = req.user.id
  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId: user_id }
  })
    .then(todos => res.render('index', { todos }))
    .catch(err => console.log(err))
})

module.exports = router