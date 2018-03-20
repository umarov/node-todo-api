import { TodoItem } from '../../todoItems/todoItem';
import { TodoList } from '../../todo-lists/todo-list';

export class LoadTodoLists {}

export class SetTodoLists {
  constructor(public payload: { todoLists: TodoList[] }) {}
}

export class CreateTodoList {
  constructor(public payload: { todoList: TodoList }) {}
}

export class SetTodoItemToList {
  constructor(public payload: { todoItem: TodoItem }) {}
}

export class UpdateTodoItemInList {
  constructor(public payload: { todoItem: TodoItem }) {}
}

export class DeleteTodoItemFromList {
  constructor(public payload: { todoItemId: string }) {}
}

export class SetCurrentTodoList {
  constructor(public payload: { todoList: TodoList }) {}
}

export class ClearCurrentTodoList {}

export class LoadTodoList {
  constructor(
    public payload: {
      todoListId: string;
    }
  ) {}
}

export class AddTodoList {
  constructor(
    public payload: {
      todoList: TodoList;
    }
  ) {}
}

export class DeleteTodoList {
  constructor(
    public payload: {
      todoListId: string;
    }
  ) {}
}

export class AddTodoItem {
  constructor(
    public payload: {
      todoItem: TodoItem;
      todoListId: string;
    }
  ) {}
}

export class RemoveTodoItem {
  constructor(
    public payload: {
      todoItem: TodoItem;
      todoListId: string;
    }
  ) {}
}

export class UpdateTodoItem {
  constructor(
    public payload: {
      todoItem: TodoItem;
      todoListId: string;
    }
  ) {}
}
