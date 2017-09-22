import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarRef, SimpleSnackBar } from '@angular/material';

export class User {
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
  snackBarRef: MdSnackBarRef<SimpleSnackBar>;
  showLogin = true;
  user: User;
  loginSubscription = new Subscription();
  signUpSubscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.user = new User();
  }

  toggleLoginSignUp() {
    this.user.password = '';
    this.showLogin = !this.showLogin;
  }

  onLogin() {
    this.loginSubscription.unsubscribe();
    this.loginSubscription = this.authService
      .login(this.user)
      .subscribe(() => {
        this.router.navigate(['/']);
      },
      console.error
    );
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
    this.signUpSubscription.unsubscribe();
  }

  onSignUp() {
    this.signUpSubscription.unsubscribe();
    this.signUpSubscription = this.authService
      .signup(this.user)
      .subscribe(() => {
        this.user.password = '';
        this.toggleLoginSignUp();
      },
    ({ error }) => {
      this.snackBarRef = this.snackBar.open(error.message, 'Dismiss', {
        duration: 5000
      });
    });
  }

}
