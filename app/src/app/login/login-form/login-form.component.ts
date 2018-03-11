import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { take } from 'rxjs/operators/take';
import { User } from '../login.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() user: User;
  @Output() onCancelLogin = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
  }

  cancelLogin() {
    this.onCancelLogin.emit('login');
  }

  onLogin() {
    this.authService
      .login(this.user)
      .pipe(take(1))
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        response => {
          this.snackBar.open(response.error.message, 'Dismiss', {
            duration: 5000,
          });
        },
      );
  }
}
