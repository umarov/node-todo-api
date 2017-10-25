const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const { TodoItem } = require('./../../models/todoItem')
const { TodoList } = require('./../../models/todoList')
const { User } = require('./../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [
  {
    _id: userOneId,
    email: 'derp@email.com',
    password: 'oneOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'test@test.com',
    password: 'userTwoPass'
  }
]

const todoItems = [
  {
    text: 'First test todo'
  },
  {
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }
]

const populateUsers = done => {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save()
      const userTwo = new User(users[1]).save()
      return Promise.all([userOne, userTwo])
    })
    .then(() => done())
}

const populateTodoItems = done => {
  TodoList.remove({})
    .then(() => TodoItem.remove({}))
    .then(() => new TodoList({ title: 'Todo list', color: 'red' }))
    .then(todoList => todoList.save())
    .then(todoList => {
      todoList.todoItems.push(...todoItems)
      return todoList.save()
    })
    .then(() => done())
    .catch(console.log)
}

module.exports = {
  todoItems,
  users,
  populateTodoItems,
  populateUsers
}
