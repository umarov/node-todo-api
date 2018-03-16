import { TodoItem } from '../db/entity/TodoItem';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

const findTodoItem = (id: string) => (todoItem: TodoItem) => todoItem.id === +id;

const getTodoItems = (req: Request, res: Response) => {
  const todoItems = req.todoList.todoItems;

  res.send(todoItems);
};

const postTodoItem = async (req: Request, res: Response) => {
  try {
    const { todoList } = req;
    const { text, completed } = req.body.todoItem;
    const todoItem = new TodoItem();
    todoItem.text = text;
    todoItem.completed = completed;
    todoItem.todoList = todoList;

    await getRepository(TodoItem).save(todoItem);
    res.send(todoItem);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteTodoItem = async (req: Request, res: Response) => {
  try {
    const { todoItemId } = req.params;
    await getRepository(TodoItem).deleteById(todoItemId)
    res.send({ todoItemId });
  } catch (err) {
    res.status(400).send();
  }
};

const showTodoItem = async (req: Request, res: Response) => {
  try {
    const { todoList } = req;
    const { todoItemId } = req.params;

    const todoItem = todoList.todoItems.find(findTodoItem(todoItemId));

    if (todoItem) {
      res.send(todoItem);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(404).send();
  }
};

const updateTodoItem = async (req: Request, res: Response) => {
  try {
    const { todoItemId } = req.params;
    const { todoList } = req;
    const { text, completed } = req.body.todoItem;

    const todoItem = todoList.todoItems.find(findTodoItem(todoItemId));
    if (todoItem) {
      todoItem.text = text;
      todoItem.completed = completed;

      await getRepository(TodoItem).save(todoItem);

      res.status(200).send(todoItem);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(400).send();
  }
};

export { getTodoItems, postTodoItem, deleteTodoItem, showTodoItem, updateTodoItem };
