import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { TodoItem } from './todoItem';

@Injectable()
export class TodoItemsService {
  constructor(private http: HttpClient) {}

  getTodoItems(todoListId: number): Observable<TodoItem[]> {
    return this.http
      .get(`${environment.backendUrl}/todoLists/${todoListId}/todoItems`)
      .pipe(map(body => body['todoItems'] as TodoItem[]));
  }

  createTodoItem(todoListId: number, todoItem: TodoItem) {
    return this.http.post(
      `${environment.backendUrl}/todoLists/${todoListId}/todoItems`,
      {
        todoItem
      }
    );
  }
}
