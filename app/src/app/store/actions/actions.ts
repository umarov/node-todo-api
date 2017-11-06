import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { TodoList } from '../../todo-lists/todo-list';

export const ADD_TODO_LIST = 'Add todo list';
export const REMOVE_TODO_LIST = 'Remove todo list';
export const UPDATE_TODO_LIST = 'Update todo list';
export const GET_TODO_LIST = 'Get a todo list';
export const GET_TODO_LISTS = 'Get all todo lists';
export const COMPLETE_TODO_LIST = 'Complete Todo list';

export const ADD_TODO_ITEM = 'Add todo item';
export const REMOVE_TODO_ITEM = 'Remove todo item';
export const UPDATE_TODO_ITEM = 'Update todo item';
export const GET_TODO_ITEM = 'Get a todo item';
export const GET_TODO_ITEMS = 'Get all todo items';
export const COMPLETE_TODO_ITEM = 'Complete todo item';

export class AddTodoList implements Action {
  readonly type = ADD_TODO_LIST;
  constructor(public payload: TodoList) {}
}

export class RemoveTodoList implements Action {
  readonly type = REMOVE_TODO_LIST;
  constructor(public payload: string) {}
}

export class UpdateTodoList implements Action {
  readonly type = UPDATE_TODO_LIST;
  constructor(public payload: TodoList) {}
}

export class GetTodoList implements Action {
  readonly type = GET_TODO_LIST;
  constructor(public payload: string) {}
}

export class GetTodoLists implements Action {
  readonly type = GET_TODO_LISTS;
  constructor() {}
}


export type Actions = AddTodoList |
  RemoveTodoList |
  UpdateTodoList |
  GetTodoList |
  GetTodoLists;



