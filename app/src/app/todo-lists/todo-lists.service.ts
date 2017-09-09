import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TodoLists } from './todo-lists';

@Injectable()
export class TodoListsService {

  constructor(private http: HttpClient) { }

  getTodoLists(): Observable<TodoLists[]> {
    return this
      .http
      .get(`${environment.backendUrl}/todo-lists`)
      .map(body => body['todo-lists'] as TodoLists[]);
  }

}
