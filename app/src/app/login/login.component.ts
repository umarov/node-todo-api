import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

class User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class LoginComponent implements OnInit, OnDestroy {
  showLogin = true;
  user: User;
  loginSubscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  toggleLoginSignUp() {
    this.showLogin = !this.showLogin;
  }

  onLogin() {
    this.loginSubscription.unsubscribe();
    this.loginSubscription = this.authService
      .login(this.user.email, this.user.password).subscribe(() => {
        this.router.navigate(['/']);
      }, console.error);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  onSignUp() {
    console.log(this.user);
  }

}
