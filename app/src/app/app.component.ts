import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { take } from 'rxjs/operators/take';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './login/auth/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AppComponent implements OnInit, OnDestroy {
  private topLevelRoutes = ['login', 'todo-lists', ''];
  private routerSubscription: Subscription;
  public showBackButton: boolean;
  constructor(public authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http
      .get(`${environment.backendUrl}`, { responseType: 'text' })
      .pipe(take(1))
      .subscribe(console.log, console.error);

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlParts = event.url.split('/');
        this.showBackButton = !this.topLevelRoutes.includes(urlParts[urlParts.length - 1]);
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  goBack() {
    window.history.back();
  }

  logout() {
    this.authService.logout();
  }
}
