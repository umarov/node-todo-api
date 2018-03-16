import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { TodoList } from './todo-list';

@Injectable()
export class TodoListsService {
  constructor(private http: HttpClient) {}

  getTodoLists(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>(`${environment.backendUrl}/todoLists`);
  }

  getTodoList(todoListId: string): Observable<TodoList> {
    return this.http.get<TodoList>(`${environment.backendUrl}/todoLists/${todoListId}`);
  }

  createTodoList(todoList: TodoList) {
    return this.http.post<TodoList>(`${environment.backendUrl}/todoLists`, todoList);
  }

  deleteTodoList(todoListId: string) {
    return this.http.delete<TodoList>(`${environment.backendUrl}/todoLists/${todoListId}`);
  }
}
