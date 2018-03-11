import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { take } from 'rxjs/operators/take';

export class User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Native,
})
export class LoginComponent implements OnInit, OnDestroy {
  snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  showLogin = true;
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.user = new User();
  }

  signedUp(user: User) {
    this.user = user;
  }

  toggleLoginSignUp() {
    this.showLogin = !this.showLogin;
  }



  ngOnDestroy() {}
}
