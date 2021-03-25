const express = require('express')
const router = express.Router()

const { Todo } = require('../../models')

router.get('/:id', (req, res) => {
  const todo_id = req.params.id
  return Todo.findByPk(todo_id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

module.exports = router