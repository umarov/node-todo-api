import { TodoItem } from '../todoItems/todoItem';

export class TodoList {
  constructor(
    public _id?: string,
    public title?: string,
    public color?: string,
    public completed?: boolean,
    public completedAt?: Date,
    public todoItems?: TodoItem[]
  ) {}
}