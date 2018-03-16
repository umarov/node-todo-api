import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';

import { environment } from '../../../environments/environment';
import { TodoItem } from './todoItem';
import { TodoListsService } from '../todo-lists/todo-lists.service';

@Injectable()
export class TodoItemsService {
  constructor(private http: HttpClient, private todoListsService: TodoListsService) {}

  getTodoItems(todoListId: string): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${environment.backendUrl}/todoLists/${todoListId}/todoItems`);
  }

  createTodoItem(todoListId: string, todoItem: TodoItem) {
    return this.http
      .post<TodoItem>(`${environment.backendUrl}/todoLists/${todoListId}/todoItems`, {
        todoItem
      })
      .pipe(tap(() => this.todoListsService.getTodoList(todoListId)));
  }

  updateTodoItem(todoListId: string, todoItem: TodoItem) {
    return this.http.patch<TodoItem>(
      `${environment.backendUrl}/todoLists/${todoListId}/todoItems/${todoItem.id}`,
      {
        todoItem
      }
    );
  }

  deleteTodoItem(todoListId: string, todoItem: TodoItem) {
    return this.http
      .delete<{ todoItemId: string }>(
        `${environment.backendUrl}/todoLists/${todoListId}/todoItems/${todoItem.id}`
      )
      .pipe(tap(() => this.todoListsService.getTodoList(todoListId)));
  }
}
