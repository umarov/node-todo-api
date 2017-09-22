const { authenticate } = require('../middleware/authenticate');

const {
  getTodos,
  postTodo,
  deleteTodo,
  showTodo,
  updateTodo
} = require('./todos.routes');

const {
  postUser,
  loginUser,
  showUser,
  getMe
} = require('./users.routes');


function _todoRoutes(app) {
  app.get('/todos', getTodos);
  app.post('/todos', postTodo);
  app.delete('/todos/:id', deleteTodo);
  app.get('/todos/:id', showTodo);
  app.patch('/todos/:id', updateTodo);
}

function _userRoutes(app) {
  app.post('/users', postUser);
  app.post('/users/login', loginUser);
  app.get('/users/me', authenticate, getMe);
  app.get('/users/:id', authenticate, showUser);
}

function setUpRoutes(app) {
  _todoRoutes(app);
  _userRoutes(app);
}

module.exports = {
  setUpRoutes
}
