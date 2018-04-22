import { State, StateContext, Action } from '@ngxs/store';
import { tap } from 'rxjs/operators';

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
  DeleteTodoItemFromList,
  CreateTodoList
} from './events/todo-list.events';
import { TodoListsService } from '../todo-lists/todo-lists.service';
import { TodoItemsService } from '../todoItems/todoItems.service';
import { TodoList } from '../todo-lists/todo-list';
import { TodoItem } from '../todoItems/todoItem';

export interface TodoStoreState {
  todoLists: TodoList[];
  currentTodoList: TodoList;
}

@State<TodoStoreState>({
  name: 'todo',
  defaults: {
    todoLists: [],
    currentTodoList: new TodoList()
  }
})
export class TodoListStore {
  constructor(
    private todoListsService: TodoListsService,
    private todoItemsService: TodoItemsService
  ) {}

  @Action(ClearCurrentTodoList)
  clearCurrentTodoList({ getState, setState }: StateContext<TodoStoreState>) {
    const state = getState();

    setState({
      ...state,
      currentTodoList: new TodoList()
    });
  }

  @Action(LoadTodoLists)
  loadTodoLists({ getState, setState }: StateContext<TodoStoreState>) {
    return this.todoListsService.getTodoLists().pipe(
      tap(todoLists => {
        const state = getState();

        setState({
          ...state,
          todoLists: todoLists.slice()
        });
      })
    );
  }

  @Action(LoadTodoList)
  loadTodoList({ getState, setState }: StateContext<TodoStoreState>, { payload }: LoadTodoList) {
    return this.todoListsService.getTodoList(payload.todoListId).pipe(
      tap(todoList => {
        const state = getState();

        setState({
          ...state,
          currentTodoList: Object.assign({}, todoList)
        });
      })
    );
  }

  @Action(CreateTodoList)
  createTodoList(
    { getState, setState }: StateContext<TodoStoreState>,
    { payload }: CreateTodoList
  ) {
    return this.todoListsService.createTodoList(payload.todoList).pipe(
      tap(todoList => {
        const state = getState();
        setState({
          ...state,
          todoLists: state.todoLists ? [...state.todoLists, payload.todoList] : [payload.todoList]
        });
      })
    );
  }

  @Action(DeleteTodoList)
  deleteTodoList({ dispatch }: StateContext<TodoStoreState>, { payload }: DeleteTodoList) {
    return this.todoListsService
      .deleteTodoList(payload.todoListId)
      .pipe(tap(() => dispatch(LoadTodoLists)));
  }

  @Action(AddTodoItem)
  addTodoItem({ getState, setState }: StateContext<TodoStoreState>, { payload }: AddTodoItem) {
    return this.todoItemsService.createTodoItem(payload.todoListId, payload.todoItem).pipe(
      tap(todoItem => {
        const state = getState();

        setState({
          ...state,
          currentTodoList: {
            ...state.currentTodoList,
            todoItems: [todoItem, ...state.currentTodoList.todoItems]
          }
        });
      })
    );
  }

  @Action(UpdateTodoItem)
  updateTodoItem(
    { getState, setState }: StateContext<TodoStoreState>,
    { payload }: UpdateTodoItem
  ) {
    return this.todoItemsService.updateTodoItem(payload.todoListId, payload.todoItem).pipe(
      tap(todoItem => {
        const state = getState();

        setState({
          ...state,
          currentTodoList: {
            ...state.currentTodoList,
            todoItems: state.currentTodoList.todoItems.map(currentTodoItem => {
              if (currentTodoItem.id === todoItem.id) {
                return todoItem;
              } else {
                return currentTodoItem;
              }
            })
          }
        });
      })
    );
  }

  @Action(RemoveTodoItem)
  removeTodoItem(
    { getState, setState }: StateContext<TodoStoreState>,
    { payload }: RemoveTodoItem
  ) {
    return this.todoItemsService.deleteTodoItem(payload.todoListId, payload.todoItem).pipe(
      tap(({ todoItemId }) => {
        const state = getState();

        setState({
          ...state,
          currentTodoList: {
            ...state.currentTodoList,
            todoItems: state.currentTodoList.todoItems.reduce(
              (todoItems, todoItem) => {
                if (todoItem.id !== +todoItemId) {
                  todoItems.push(todoItem);
                }

                return todoItems;
              },
              [] as TodoItem[]
            )
          }
        });
      })
    );
  }
}
