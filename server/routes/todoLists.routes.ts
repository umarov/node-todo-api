import { TodoList } from '../db/entity/TodoList';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

const getTodoLists = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    const todoLists = user.todoLists;

    res.send(todoLists);
  } catch (err) {
    res.status(400).send(err);
  }
};

const postTodoList = async (req: Request, res: Response) => {
  const { user, body } = req;
  const { title, color, completed } = body;
  try {
    const todoList = await TodoList.create({ title, color, completed, user });
    res.send(todoList);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteTodoList = async (req: Request, res: Response) => {
  const { todoList } = req;
  try {
    await getRepository(TodoList).remove(todoList);

    res.send(todoList);
  } catch (_) {
    res.status(400).send();
  }
};

const showTodoList = async (req: Request, res: Response) => {
  const { todoList } = req;

  res.send(todoList);
};

const updateTodoList = async (req: Request, res: Response) => {
  const { user, todoList } = req;

  try {
    const { title, completed, color } = req.body;

    await TodoList.update(todoList, {
      title,
      color,
      completed,
      user
    });

    res.status(200).send(todoList);
  } catch (err) {
    res.status(400).send();
  }
};

export { getTodoLists, postTodoList, deleteTodoList, showTodoList, updateTodoList };
