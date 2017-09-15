import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable()
export class AuthService {
  EMAIL_KEY = 'todo-user-email';
  TOKEN_KEY = 'todo-user-x-auth-token';

  constructor(private http: HttpClient) { }

  getEmail() {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  hasAuth() {
    const email   = this.getEmail();
    const token = this.getToken();

    return email !== null && token !== null;
  }

  storeCredentials(email: string, token: string) {
    localStorage.setItem(this.EMAIL_KEY, email);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  login(email: string, password: string) {
    return this
      .http
      .post(`${environment.backendUrl}/users/login`, { email, password })
      .map(data => {

      });
  }

  logout() {
    localStorage.clear();
  }
}
