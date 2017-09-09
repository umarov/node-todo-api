import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TodosService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Object> {
    return this.http.get(`${environment.backendUrl}/todos`).map(body => body['todos']);
  }

}
