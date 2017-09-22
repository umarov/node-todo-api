import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../login.component';


@Injectable()
export class AuthService {
  EMAIL_KEY = 'todo-user-email';
  TOKEN_KEY = 'todo-user-x-auth-token';

  constructor(private http: HttpClient, private router: Router) { }

  getEmail() {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  hasAuth() {
    const email = this.getEmail();
    const token = this.getToken();

    return email !== null && token !== null;
  }

  storeCredentials(email: string, token: string) {
    localStorage.setItem(this.EMAIL_KEY, email);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  login({ email, password }: User) {
    return this.http
      .post(`${environment.backendUrl}/users/login`, { email, password }, { observe: 'response' })
      .do(response => {
        this.storeCredentials(email, response.body['token']);
        return response;
      });
  }

  signup({ email, password, name }: User) {
    return this.http
      .post(
        `${environment.backendUrl}/users`,
        { email, password, name }
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
