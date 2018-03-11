const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { TodoItem } = require('./../../models/todoItem');
const { TodoList } = require('./../../models/todoList');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'derp@email.com',
    password: 'oneOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString(),
      },
    ],
  },
  {
    _id: userTwoId,
    email: 'test@test.com',
    password: 'userTwoPass',
  },
];

const todoItems = [
  {
    text: 'First test todo',
  },
  {
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
  },
];

const populateUsers = async () => {
  await User.remove({});
  const userOne = new User(users[0]);
  const userTwo = new User(users[1]);
  await Promise.all([userOne.save(), userTwo.save()]);
};

const populateTodoItems = async () => {
  await TodoList.remove({});
  await TodoItem.remove({});
  let todoList = new TodoList({ title: 'Todo list', color: 'red' });
  todoList = await todoList.save();
  todoList.todoItems.push(...todoItems);
  await todoList.save();
};

module.exports = {
  todoItems,
  users,
  populateTodoItems,
  populateUsers,
};
