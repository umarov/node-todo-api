import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from './login/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AppComponent implements OnInit, OnDestroy {
  private topLevelRoutes = ['login', 'todo-lists'];
  private routerSubscription: Subscription;
  public showBackButton: boolean;
  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.http
      .get(`${environment.backendUrl}`, { responseType: 'text' })
      .pipe(take(1))
      .subscribe(console.log, console.error);

    this.routerSubscription = this.router.events
      .subscribe((event) => {
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
