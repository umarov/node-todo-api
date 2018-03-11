import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { TodoItem } from './todoItem';
import { tap } from 'rxjs/operators/tap';
import { TodoListsService } from '../todo-lists/todo-lists.service';

@Injectable()
export class TodoItemsService {
  constructor(private http: HttpClient, private todoListsService: TodoListsService) {}

  getTodoItems(todoListId: string): Observable<TodoItem[]> {
    return this.http
      .get(`${environment.backendUrl}/todoLists/${todoListId}/todoItems`)
      .pipe(map(body => body['todoItems'] as TodoItem[]));
  }

  createTodoItem(todoListId: string, todoItem: TodoItem) {
    return this.http.post(
      `${environment.backendUrl}/todoLists/${todoListId}/todoItems`,
      {
        todoItem
      }
    ).pipe(tap(() => this.todoListsService.getTodoList(todoListId)));
  }

  updateTodoItem(todoListId: string, todoItem: TodoItem) {
    return this.http.patch(
      `${environment.backendUrl}/todoLists/${todoListId}/todoItems/${todoItem.id}`,
      {
        todoItem
      }
    );
  }

  deleteTodoItem(todoListId: string, todoItem: TodoItem) {
    return this.http.delete(
      `${environment.backendUrl}/todoLists/${todoListId}/todoItems/${todoItem.id}`,
    ).pipe(tap(() => this.todoListsService.getTodoList(todoListId)));
  }
}
