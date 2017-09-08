const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Node Todo App.')
});

app.get('/todos', async (req, res) => {
  res.send(await Todo.find({}))
});

app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body)
  try {
    await todo.save();
    res.send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => console.log(`Started on port ${port}`));

module.exports = {
  app
};
