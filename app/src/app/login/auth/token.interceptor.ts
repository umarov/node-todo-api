import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('todo-user-x-auth-token');
    if (token) {
      const authReq = request.clone({setHeaders: {'x-auth': token}});
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }

  }
}
