import { TodoItem } from '../../todoItems/todoItem';
import { TodoList } from '../../todo-lists/todo-list';

export class LoadTodoLists {
  static readonly type = '[Todo] Load Todo Lists';
}

export class SetTodoLists {
  static readonly type = '[Todo] Set Todo Lists';
  constructor(public payload: { todoLists: TodoList[] }) {}
}

export class CreateTodoList {
  static readonly type = '[Todo] Create Todo Lists';
  constructor(public payload: { todoList: TodoList }) {}
}

export class SetTodoItemToList {
  static readonly type = '[Todo] Set Todo Item To List';
  constructor(public payload: { todoItem: TodoItem }) {}
}

export class UpdateTodoItemInList {
  static readonly type = '[Todo] Update Todo item In List';
  constructor(public payload: { todoItem: TodoItem }) {}
}

export class DeleteTodoItemFromList {
  static readonly type = '[Todo] Delete Todo Item From List';
  constructor(public payload: { todoItemId: string }) {}
}

export class SetCurrentTodoList {
  static readonly type = '[Todo] Set Current Todo List';
  constructor(public payload: { todoList: TodoList }) {}
}

export class ClearCurrentTodoList {
  static readonly type = '[Todo] Clear Current Todo List';
}

export class LoadTodoList {
  static readonly type = '[Todo] Load Todo List';
  constructor(
    public payload: {
      todoListId: string;
    }
  ) {}
}

export class AddTodoList {
  static readonly type = '[Todo] Add Todo List';
  constructor(
    public payload: {
      todoList: TodoList;
    }
  ) {}
}

export class DeleteTodoList {
  static readonly type = '[Todo] Delete Todo List';
  constructor(
    public payload: {
      todoListId: string;
    }
  ) {}
}

export class AddTodoItem {
  static readonly type = '[Todo] Add Todo Item';
  constructor(
    public payload: {
      todoItem: TodoItem;
      todoListId: string;
    }
  ) {}
}

export class RemoveTodoItem {
  static readonly type = '[Todo] Remove Todo Item';
  constructor(
    public payload: {
      todoItem: TodoItem;
      todoListId: string;
    }
  ) {}
}

export class UpdateTodoItem {
  static readonly type = '[Todo] Update Todo Item';
  constructor(
    public payload: {
      todoItem: TodoItem;
      todoListId: string;
    }
  ) {}
}
