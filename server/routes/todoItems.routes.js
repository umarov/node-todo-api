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
    console.log(req.body);
    req.todoList.todoItems.push(req.body)
    const todoList = await req.todoList.save()
    const todoItem = todoList.todoItems[_.findLastIndex(todoList.todoItems)]
    res.send({ todoItem })
  } catch (e) {
    res.status(400).send(e)
  }
}

const deleteTodoItem = async (req, res) => {
  try {
    const todoItemId = req.params.todoItemId

    if (!ObjectId.isValid(todoItemId)) {
      return res.status(404).send()
    }

    const todoItem = await req.todoList.todoItems.id(todoItemId).remove()

    if (todoItem) {
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
    const todoItemId = req.params.todoItemId

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
  try {
    const todoItemId = req.params.todoItemId
    const body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectId.isValid(todoItemId)) {
      return res.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime()
    } else {
      body.completed = false
      body.completedAt = null
    }

    const todoItem = await req.todoList.todoItems.id(todoItemId)
    todoItem.set(body);

    await req.todoList.save()
    if (todoItem) {
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
