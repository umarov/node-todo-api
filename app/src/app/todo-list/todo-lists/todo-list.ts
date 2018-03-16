import { TodoItem } from '../todoItems/todoItem';

export class TodoList {
  id: string;

  constructor(
    public title?: string,
    public color?: string,
    public completed?: boolean,
    public completedAt?: Date,
    public todoItems: TodoItem[] = []
  ) {}
}
