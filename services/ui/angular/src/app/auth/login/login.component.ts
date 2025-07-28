import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'codeveros-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  loggingIn = false;
  message: string;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
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

    const {username, password} = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      () => {
        this.loggingIn = false;
        if (this.authService.isLoggedIn()) {
          const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/';
          this.router.navigateByUrl(redirect);
        } else {
          this.message = 'Failed login';
        }
      },
      err => {
        this.loggingIn = false;
        this.message = 'Failed login';

      });
  }

}
