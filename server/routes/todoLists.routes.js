const { ObjectId } = require('mongodb')
const _ = require('lodash')

const { TodoList } = require('../models/todoList')

const getTodoLists = async (req, res) => {
  const { user } = req
  try {
    const todoLists = await user.todoLists

    res.send({ todoLists })
  } catch (err) {
    res.status(400).send(err)
  }
}

const postTodoList = async (req, res) => {
  const { user, body } = req
  const todoList = new TodoList(body)
  try {
    user.todoLists.push(todoList)
    await user.save()

    res.send({ todoList })
  } catch (e) {
    res.status(400).send(e)
  }
}

const deleteTodoList = async (req, res) => {
  const { user, params } = req
  try {
    const { todoListId } = params

    if (!ObjectId.isValid(todoListId)) {
      return res.status(404).send()
    }

    const todoList = await user.todoLists.id(todoListId)

    if (todoList) {
      await todoList.remove()
      res.send({ todoList })
    } else {
      res.status(404).send()
    }
  } catch (_) {
    res.status(400).send()
  }
}

const showTodoList = async (req, res) => {
  const { user, params } = req
  try {
    const { todoListId } = params

    if (!ObjectId.isValid(todoListId)) {
      return res.status(404).send()
    }

    const todoList = await user.todoLists.id(todoListId)

    if (todoList) {
      res.send({ todoList })
    } else {
      res.status(404).send()
    }
  } catch (err) {
    res.status(404).send()
  }
}

const updateTodoList = async (req, res) => {
  const { user, params } = req;

  try {
    const { todoListId } = params
    const body = _.pick(req.body, ['title', 'completed', 'color'])

    if (!ObjectId.isValid(todoListId)) {
      return res.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime()
    } else {
      body.completed = false
      body.completedAt = null
    }

    const todoList = await user.todoLists.id(todoListId)

    if (todoList) {
      todoList.set(body)
      await user.save()

      res.status(200).send({ todoList })
    } else {
      res.status(404).send()
    }
  } catch (err) {
    res.status(400).send()
  }
}

module.exports = {
  getTodoLists,
  postTodoList,
  deleteTodoList,
  showTodoList,
  updateTodoList
}
