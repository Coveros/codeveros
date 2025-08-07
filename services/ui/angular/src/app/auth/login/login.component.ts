import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'codeveros-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  loggingIn = false;
  message: string;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get password() {
    return this.loginForm.controls.password;
  }

  get username() {
    return this.loginForm.controls.username;
  }

  onLogin() {
    if (this.loggingIn) {
      return;
    }

    this.loggingIn = true;
    this.message = 'Trying to sign in...';

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      () => {
        this.loggingIn = false;
        if (this.authService.isLoggedIn()) {
          const redirect = this.authService.redirectUrl
            ? this.router.parseUrl(this.authService.redirectUrl)
            : '/';
          this.router.navigateByUrl(redirect);
        } else {
          this.message = 'Failed login';
        }
      },
      () => {
        this.loggingIn = false;
        this.message = 'Failed login';
      },
    );
  }
}
