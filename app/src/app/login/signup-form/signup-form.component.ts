import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from '../login.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  user: User;
  @Output() onCancelSignUp = new EventEmitter();
  @Output() signedUp = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.user = new User();
  }

  cancelSignup() {
    this.onCancelSignUp.emit('signup');
  }

  onSignUp() {
    this.authService
      .signup(this.user)
      .pipe(take(1))
      .subscribe(
        () => {
          this.user.password = '';
          this.signedUp.emit(this.user);
        },
        response => {
          console.log(response);
          this.snackBar.open(response.error.message, 'Dismiss', {
            duration: 5000,
          });
        },
      );
  }
}
