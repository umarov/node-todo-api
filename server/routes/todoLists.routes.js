const { ObjectId } = require('mongodb')
const _ = require('lodash')

const { TodoList } = require('../models/todoList')

const getTodoLists = async (req, res) => {
  try {
    const todoLists = await TodoList.find()

    res.send({ todoLists })
  } catch (err) {
    res.status(400).send(err)
  }
}

const postTodoList = async (req, res) => {
  const todoList = new TodoList(req.body)
  try {
    await todoList.save()

    res.send({ todoList })
  } catch (e) {
    res.status(400).send(e)
  }
}

const deleteTodoList = async (req, res) => {
  try {
    const { todoListId } = req.params

    if (!ObjectId.isValid(todoListId)) {
      return res.status(404).send()
    }

    const todoList = await TodoList.findByIdAndRemove(todoListId)

    if (todoList) {
      res.send({ todoList })
    } else {
      res.status(404).send()
    }
  } catch (_) {
    res.status(400).send()
  }
}

const showTodoList = async (req, res) => {
  try {
    const { todoListId } = req.params

    if (!ObjectId.isValid(todoListId)) {
      return res.status(404).send()
    }

    const todoList = await TodoList.findById(todoListId)

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
  try {
    const { todoListId } = req.params
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

    const todoList = await TodoList.findByIdAndUpdate(
      todoListId,
      { $set: body },
      { new: true }
    )

    if (todoList) {
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
