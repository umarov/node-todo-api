import { Store, Mutation, Action } from 'ngxs';
import { map } from 'rxjs/operators/map';

import {
  LoadTodoLists,
  SetTodoLists,
  SetCurrentTodoList,
  ClearCurrentTodoList,
  LoadTodoList,
  AddTodoList,
  DeleteTodoList,
  AddTodoItem,
  RemoveTodoItem,
  UpdateTodoItem,
  SetTodoItemToList,
  UpdateTodoItemInList,
  DeleteTodoItemFromList
} from './events/todo-list.events';
import { TodoListsService } from '../todo-lists/todo-lists.service';
import { TodoItemsService } from '../todoItems/todoItems.service';
import { TodoList } from '../todo-lists/todo-list';
import { TodoItem } from '../todoItems/todoItem';

export interface TodoStoreState {
  todoLists: TodoList[];
  currentTodoList: TodoList;
}

@Store<TodoStoreState>({
  defaults: {
    todoLists: null,
    currentTodoList: new TodoList()
  }
})
export class TodoListStore {
  constructor(
    private todoListsService: TodoListsService,
    private todoItemsService: TodoItemsService
  ) {}

  @Mutation(AddTodoList)
  addTodoList(state: TodoStoreState, { payload }: AddTodoList) {
    state.todoLists = [...state.todoLists, payload.todoList];
  }

  @Mutation(SetTodoLists)
  setTodoList(state: TodoStoreState, { payload }: SetTodoLists) {
    state.todoLists = payload.todoLists.slice();
  }

  @Mutation(SetCurrentTodoList)
  setCurrentTodoList(state: TodoStoreState, { payload }: SetCurrentTodoList) {
    state.currentTodoList = Object.assign({}, payload.todoList);
  }

  @Mutation(SetTodoItemToList)
  SetTodoItemToList(state: TodoStoreState, { payload }: SetTodoItemToList) {
    state.currentTodoList.todoItems = [payload.todoItem, ...state.currentTodoList.todoItems];
  }

  @Mutation(UpdateTodoItemInList)
  updateTodoItemInList(state: TodoStoreState, { payload }: UpdateTodoItemInList) {
    state.currentTodoList.todoItems = state.currentTodoList.todoItems.map(todoItem => {
      if (todoItem.id === payload.todoItem.id) {
        return payload.todoItem;
      } else {
        return todoItem;
      }
    });
  }

  @Mutation(DeleteTodoItemFromList)
  deleteTodoItemFromList(state: TodoStoreState, { payload }: DeleteTodoItemFromList) {
    state.currentTodoList.todoItems = state.currentTodoList.todoItems.reduce(
      (todoItems, todoItem) => {
        if (todoItem.id !== +payload.todoItemId) {
          todoItems.push(todoItem);
        }

        return todoItems;
      },
      [] as TodoItem[]
    );
  }

  @Mutation(ClearCurrentTodoList)
  clearCurrentTodoList(state: TodoStoreState) {
    state.currentTodoList = new TodoList();
  }

  @Action(LoadTodoLists)
  loadTodoLists() {
    return this.todoListsService
      .getTodoLists()
      .pipe(map(todoLists => new SetTodoLists({ todoLists })));
  }

  @Action(LoadTodoList)
  loadTodoList(_: TodoStoreState, { payload }: LoadTodoList) {
    return this.todoListsService
      .getTodoList(payload.todoListId)
      .pipe(map(todoList => new SetCurrentTodoList({ todoList })));
  }

  @Action(DeleteTodoList)
  deleteTodoList(_: TodoStoreState, { payload }: DeleteTodoList) {
    return this.todoListsService
      .deleteTodoList(payload.todoListId)
      .pipe(map(() => new LoadTodoLists()));
  }

  @Action(AddTodoItem)
  addTodoItem(_: TodoStoreState, { payload }: AddTodoItem) {
    return this.todoItemsService
      .createTodoItem(payload.todoListId, payload.todoItem)
      .pipe(map(todoItem => new SetTodoItemToList({ todoItem })));
  }

  @Action(UpdateTodoItem)
  updateTodoItem(_: TodoStoreState, { payload }: UpdateTodoItem) {
    return this.todoItemsService
      .updateTodoItem(payload.todoListId, payload.todoItem)
      .pipe(map(todoItem => new UpdateTodoItemInList({ todoItem })));
  }

  @Action(RemoveTodoItem)
  removeTodoItem(_: TodoStoreState, { payload }: RemoveTodoItem) {
    return this.todoItemsService
      .deleteTodoItem(payload.todoListId, payload.todoItem)
      .pipe(map(({ todoItemId }) => new DeleteTodoItemFromList({ todoItemId })));
  }
}
