const { authenticate } = require('../middleware/authenticate')
const { todoListChecker } = require('../middleware/todoList')

const {
  getTodoItems,
  postTodoItem,
  deleteTodoItem,
  showTodoItem,
  updateTodoItem
} = require('./todoItems.routes')

const {
  getTodoLists,
  postTodoList,
  deleteTodoList,
  showTodoList,
  updateTodoList
} = require('./todoLists.routes')

const { postUser, loginUser, showUser, getMe } = require('./users.routes')

function _todoItemRoutes(todoListUrl, app) {
  app.get(`${todoListUrl}/todoItems`, todoListChecker, getTodoItems)
  app.post(`${todoListUrl}/todoItems`, todoListChecker, postTodoItem)
  app.delete(`${todoListUrl}/todoItems/:todoItemId`, todoListChecker, deleteTodoItem)
  app.get(`${todoListUrl}/todoItems/:todoItemId`, todoListChecker, showTodoItem)
  app.patch(`${todoListUrl}/todoItems/:todoItemId`, todoListChecker, updateTodoItem)
}

function _todoListRoutes(app) {
  app.get('/todoLists', getTodoLists)
  app.post('/todoLists', postTodoList)
  app.delete('/todoLists/:todoListId', deleteTodoList)
  app.get('/todoLists/:todoListId', showTodoList)
  app.patch('/todoLists/:todoListId', updateTodoList)

  _todoItemRoutes('/todoLists/:todoListId', app)
}

function _userRoutes(app) {
  app.post('/users', postUser)
  app.post('/users/login', loginUser)
  app.get('/users/me', authenticate, getMe)
  app.get('/users/:id', authenticate, showUser)
}

function setUpRoutes(app) {
  _todoListRoutes(app)
  _userRoutes(app)
}

module.exports = {
  setUpRoutes
}
