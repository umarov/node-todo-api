const { ObjectId } = require('mongodb')
const _ = require('lodash')

const { TodoItem } = require('../models/todoItem')

const getTodoItems = async (req, res) => {
  try {
    const todoItems = await req.todoList.todoItems

    res.send({ todoItems })
  } catch (err) {
    res.status(400).send(err)
  }
}

const postTodoItem = async (req, res) => {
  try {
    const { todoList, user } = req
    const todoItem = new TodoItem(req.body.todoItem)
    todoList.todoItems.push(todoItem)
    await user.save()
    res.send({ todoItem })
  } catch (e) {
    res.status(400).send(e)
  }
}

const deleteTodoItem = async (req, res) => {
  const { todoList, user } = req
  try {
    const { todoItemId } = req.params

    if (!ObjectId.isValid(todoItemId)) {
      return res.status(404).send()
    }

    const todoItem = await todoList.todoItems.id(todoItemId)
    if (todoItem) {
      await todoItem.remove()
      await user.save()
      res.send({ todoItem })
    } else {
      res.status(404).send()
    }
  } catch (_) {
    res.status(400).send()
  }
}

const showTodoItem = async (req, res) => {
  try {
    const { todoItemId } = req.params

    if (!ObjectId.isValid(todoItemId)) {
      return res.status(404).send()
    }

    const todoItem = await req.todoList.todoItems.id(todoItemId)

    if (todoItem) {
      res.send({ todoItem })
    } else {
      res.status(404).send()
    }
  } catch (err) {
    res.status(404).send()
  }
}

const updateTodoItem = async (req, res) => {
  const { todoList, user } = req
  try {
    const { todoItemId } = req.params
    const body = _.pick(req.body.todoItem, ['text', 'completed'])

    if (!ObjectId.isValid(todoItemId)) {
      return res.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime()
    } else {
      body.completed = false
      body.completedAt = null
    }

    const todoItem = await todoList.todoItems.id(todoItemId)
    if (todoItem) {
      todoItem.set(body)
      await user.save()

      res.status(200).send({ todoItem })
    } else {
      res.status(404).send()
    }
  } catch (err) {
    res.status(400).send()
  }
}

module.exports = {
  getTodoItems,
  postTodoItem,
  deleteTodoItem,
  showTodoItem,
  updateTodoItem
}
