import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {passwordMatchValidator} from '../../shared/password-match-validator/password-match-validator';
import {PasswordMatchErrorMatcher} from '../../shared/password-match-validator/password-match-error-matcher';

@Component({
  selector: 'codeveros-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {
  passwordErrorMatcher = new PasswordMatchErrorMatcher();
  registerForm: UntypedFormGroup;
  submitting = false;
  message: string;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ],
      confirmPassword: [ '', Validators.required ],
      firstName: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ] ],
    }, {
      validator: passwordMatchValidator('password', 'confirmPassword')
    });
  }

  onRegister() {
    if (this.submitting) {
      return;
    }

    this.submitting = true;
    this.message = 'Trying to register...';

    const value = this.registerForm.value;

    this.authService.register(value).subscribe(
      () => {
        this.submitting = false;
        if (this.authService.isLoggedIn()) {
          const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/';
          this.router.navigateByUrl(redirect);
        } else {
          this.message = 'Failed registration';
        }
      },
      err => {
        this.submitting = false;
        this.message = 'Failed registration';

      });
  }

}
