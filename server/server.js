const express      = require('express');
const bodyParser   = require('body-parser');
const { ObjectId } = require('mongodb');
const cors         = require('cors');

const port = process.env.PORT || 3000;
const production = process.env.NODE_ENV || false

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();

const originUrl = production ? 'https://umarov.github.io/node-todo-api' : 'http://localhost:4200';

app.use(cors({
  "origin": originUrl,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Node Todo App.');
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send({ todos });
  } catch(err) {
    res.status(400).send(err);
  }
});

app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body)
  try {
    await todo.save();
    res.send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).send()
    }

    const todo = await Todo.findById(id)

    if (todo) {
      res.send({ todo });
    } else {
      res.status(404).send();
    }
  } catch(err) {
    res.status(404).send();
  }
});

app.listen(port, () => console.log(`Started on port ${port}`));

module.exports = {
  app
};
