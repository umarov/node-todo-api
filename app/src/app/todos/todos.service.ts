import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Todos } from './todos';

@Injectable()
export class TodosService {

  constructor(private http: HttpClient) { }

  getTodos(todoListId: number): Observable<Todos[]> {
    return this
      .http
      .get(`${environment.backendUrl}/todo-lists/${todoListId}/todos`)
      .map(body => body['todos'] as Todos[]);
  }
}
