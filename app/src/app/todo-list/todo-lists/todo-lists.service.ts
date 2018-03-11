import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';

import { environment } from '../../../environments/environment';
import { TodoList } from './todo-list';

@Injectable()
export class TodoListsService {
  todoLists$: Subject<TodoList[]>;
  todoList$: Subject<TodoList>;

  constructor(private http: HttpClient) {
    this.todoLists$ = new Subject<TodoList[]>();
    this.todoList$ = new Subject<TodoList>();
  }

  getTodoLists(): Observable<TodoList[]> {
    this.http
      .get(`${environment.backendUrl}/todoLists`)
      .pipe(map(body => body['todoLists'] as TodoList[]))
      .pipe(take(1))
      .subscribe(todoLists => this.todoLists$.next(todoLists));

    return this.todoLists$;
  }

  getTodoList(todoListId: string): Observable<TodoList> {
    this.http
      .get(`${environment.backendUrl}/todoLists/${todoListId}`)
      .pipe(map(body => body['todoList'] as TodoList), take(1))
      .subscribe(todoList => this.todoList$.next(todoList));

    return this.todoList$;
  }

  createTodoList(todoList: TodoList) {
    return this.http.post(`${environment.backendUrl}/todoLists`, todoList);
  }

  deleteTodoList(todoList: TodoList) {
    return this.http.delete(
      `${environment.backendUrl}/todoLists/${todoList.id}`
    );
  }
}
