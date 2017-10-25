import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from './login/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(`${environment.backendUrl}`, { responseType: 'text' })
      .pipe(take(1))
      .subscribe(console.log, console.error);
  }

  logout() {
    this.authService.logout();
  }
}
