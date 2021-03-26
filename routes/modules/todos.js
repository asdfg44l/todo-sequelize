const express = require('express')
const router = express.Router()

const { Todo } = require('../../models')

//new
router.get('/new', (req, res) => {
  res.render('new')
})

//edit
router.get('/:id/edit', async (req, res) => {
  const user_id = req.user.id
  const todo_id = req.params.id
  try {
    let todo = await Todo.findOne({ where: { id: todo_id, UserId: user_id } })
    return res.render('edit', { todo: todo.toJSON() })
  } catch (e) {
    console.warn(e)
  }
})

//create todo
router.post('/', async (req, res) => {
  const user_id = req.user.id
  const { name } = req.body
  try {
    await Todo.create({ name, UserId: user_id })

    return res.redirect('/')
  } catch (e) {
    console.warn(e)
  }
})

//edit todo
router.put('/:id', async (req, res) => {
  const user_id = req.user.id
  const todo_id = req.params.id
  const { name, isDone } = req.body
  try {
    let todo = await Todo.findOne({ where: { id: todo_id, UserId: user_id } })
    todo.name = name
    todo.isDone = isDone === 'on'
    await todo.save()
    return res.redirect('/')
  } catch (e) {
    console.warn(e)
  }
})

//delete todo
router.delete('/:id', async (req, res) => {
  const user_id = req.user.id
  const todo_id = req.params.id
  try {
    let todo = await Todo.findOne({ where: { id: todo_id, UserId: user_id } })
    await todo.destroy()
    return res.redirect('/')
  } catch (e) {
    console.warn(e)
  }
})



//detail
router.get('/:id', async (req, res) => {
  const user_id = req.user.id;
  const todo_id = req.params.id
  try {
    let todo = await Todo.findOne({ where: { id: todo_id, UserId: user_id } })
    return res.render('detail', { todo: todo.toJSON() })
  } catch (e) {
    console.warn(err)
  }
})

module.exports = router