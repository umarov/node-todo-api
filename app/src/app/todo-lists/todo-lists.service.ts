import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { TodoList } from './todo-list';

@Injectable()
export class TodoListsService {

  constructor(private http: HttpClient) { }

  getTodoLists(): Observable<TodoList[]> {
    return this
      .http
      .get(`${environment.backendUrl}/todoLists`)
      .pipe(map(body => body['todoLists'] as TodoList[]));
  }

  createTodoList(todoList: TodoList) {
    return this
      .http
      .post(`${environment.backendUrl}/todoLists`, todoList);
  }

  deleteTodoList(todoList: TodoList) {
    return this
      .http
      .delete(`${environment.backendUrl}/todoLists/${todoList._id}`);
  }

}
