import { Application } from 'express';

import { authenticate } from '../middleware/authenticate';
import { todoListChecker } from '../middleware/todoList';

import {
  getTodoItems,
  postTodoItem,
  deleteTodoItem,
  showTodoItem,
  updateTodoItem,
} from './todoItems.routes';

import {
  getTodoLists,
  postTodoList,
  deleteTodoList,
  showTodoList,
  updateTodoList,
} from './todoLists.routes';

import {
  postUser, loginUser, logoutUser, showUser, getMe,
} from './users.routes';

function todoItemRoutes(todoListUrl: string, app: Application) {
  app.get(`${todoListUrl}/todoItems`, [authenticate, todoListChecker], getTodoItems);
  app.post(`${todoListUrl}/todoItems`, [authenticate, todoListChecker], postTodoItem);
  app.delete(
    `${todoListUrl}/todoItems/:todoItemId`,
    [authenticate, todoListChecker],
    deleteTodoItem,
  );
  app.get(`${todoListUrl}/todoItems/:todoItemId`, [authenticate, todoListChecker], showTodoItem);
  app.patch(
    `${todoListUrl}/todoItems/:todoItemId`,
    [authenticate, todoListChecker],
    updateTodoItem,
  );
}

function todoListRoutes(app: Application) {
  app.get('/todoLists', authenticate, getTodoLists);
  app.post('/todoLists', authenticate, postTodoList);
  app.delete('/todoLists/:todoListId', [authenticate, todoListChecker], deleteTodoList);
  app.get('/todoLists/:todoListId', [authenticate, todoListChecker], showTodoList);
  app.patch('/todoLists/:todoListId', [authenticate, todoListChecker], updateTodoList);

  todoItemRoutes('/todoLists/:todoListId', app);
}

function userRoutes(app: Application) {
  app.post('/users', postUser);
  app.post('/users/login', loginUser);
  app.post('/users/logout', authenticate, logoutUser);
  app.get('/users/me', authenticate, getMe);
  app.get('/users/:id', authenticate, showUser);
}

export function setUpRoutes(app: Application) {
  todoListRoutes(app);
  userRoutes(app);
}
