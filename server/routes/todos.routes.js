const { ObjectId } = require('mongodb');
const _            = require('lodash');

const { Todo } = require('../models/todo');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.send({ todos });
  } catch(err) {
    res.status(400).send(err);
  }
}

const postTodo = async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await todo.save();

    res.send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
}

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }

    const todo = await Todo.findByIdAndRemove(id);

    if (todo) {
      res.send({ todo });
    } else {
      res.status(404).send();
    }
  } catch(_) {
    res.status(400).send();
  }
}

const showTodo = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }

    const todo = await Todo.findById(id);

    if (todo) {
      res.send({ todo });
    } else {
      res.status(404).send();
    }
  } catch(err) {
    res.status(404).send();
  }
}

const updateTodo = async (req, res) => {
  try {
    const id   = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed   = false;
      body.completedAt = null;
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (todo) {
      res.status(200).send({ todo });
    } else {
      res.status(404).send();
    }
  } catch(err) {
    res.status(400).send();
  }
}

module.exports = {
  getTodos,
  postTodo,
  deleteTodo,
  showTodo,
  updateTodo
}
