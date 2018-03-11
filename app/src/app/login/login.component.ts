import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
export class LoginComponent implements OnInit {
  showLogin = true;
  user: User;

  constructor() {}

  ngOnInit() {
    this.user = new User();
  }

  signedUp(user: User) {
    this.user = user;

    this.toggleLoginSignUp();
  }

  toggleLoginSignUp() {
    this.showLogin = !this.showLogin;
  }
}
