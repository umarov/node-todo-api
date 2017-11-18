const { authenticate } = require('../middleware/authenticate');
const { todoListChecker } = require('../middleware/todoList');

const {
  getTodoItems,
  postTodoItem,
  deleteTodoItem,
  showTodoItem,
  updateTodoItem
} = require('./todoItems.routes');

const {
  getTodoLists,
  postTodoList,
  deleteTodoList,
  showTodoList,
  updateTodoList
} = require('./todoLists.routes');

const {
  postUser,
  loginUser,
  logoutUser,
  showUser,
  getMe
} = require('./users.routes');

function _todoItemRoutes(todoListUrl, app) {
  app.get(
    `${todoListUrl}/todoItems`,
    [authenticate, todoListChecker],
    getTodoItems
  );
  app.post(
    `${todoListUrl}/todoItems`,
    [authenticate, todoListChecker],
    postTodoItem
  );
  app.delete(
    `${todoListUrl}/todoItems/:todoItemId`,
    [authenticate, todoListChecker],
    deleteTodoItem
  );
  app.get(
    `${todoListUrl}/todoItems/:todoItemId`,
    [authenticate, todoListChecker],
    showTodoItem
  );
  app.patch(
    `${todoListUrl}/todoItems/:todoItemId`,
    [authenticate, todoListChecker],
    updateTodoItem
  );
}

function _todoListRoutes(app) {
  app.get('/todoLists', authenticate, getTodoLists);
  app.post('/todoLists', authenticate, postTodoList);
  app.delete('/todoLists/:todoListId', authenticate, deleteTodoList);
  app.get('/todoLists/:todoListId', authenticate, showTodoList);
  app.patch('/todoLists/:todoListId', authenticate, updateTodoList);

  _todoItemRoutes('/todoLists/:todoListId', app);
}

function _userRoutes(app) {
  app.post('/users', postUser);
  app.post('/users/login', loginUser);
  app.post('/users/logout', authenticate, logoutUser);
  app.get('/users/me', authenticate, getMe);
  app.get('/users/:id', authenticate, showUser);
}

function setUpRoutes(app) {
  _todoListRoutes(app);
  _userRoutes(app);
}

module.exports = {
  setUpRoutes
};
