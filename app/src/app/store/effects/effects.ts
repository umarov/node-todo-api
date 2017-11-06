import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { TodoListsService } from '../../todo-lists/todo-lists.service';
import { Observable } from 'rxjs/Observable';
import { TodoList } from '../../todo-lists/todo-list';
import * as TodoActions from '../actions/actions';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class TodoListEffects {
  constructor(
    private actions$: Actions,
    private todoListsService: TodoListsService
  ) {}

  @Effect()
  getTodoLists$: Observable<TodoList[]> = this.actions$
    .ofType(TodoActions.GET_TODO_LISTS)
    .pipe(
      switchMap(() => this.todoListsService.getTodoLists())
    );

  @Effect()
  getTodoList$: Observable<TodoList> = this.actions$
    .ofType(TodoActions.GET_TODO_LIST)
    .pipe(
      map(toPayload),
      switchMap(id => this.todoListsService.getTodoList(id))
    );
}
