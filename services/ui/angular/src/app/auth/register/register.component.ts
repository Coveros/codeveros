import { Component, OnInit, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../shared/password-match-validator/password-match-validator';
import { PasswordMatchErrorMatcher } from '../../shared/password-match-validator/password-match-error-matcher';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'codeveros-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  formBuilder = inject(UntypedFormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  passwordErrorMatcher = new PasswordMatchErrorMatcher();
  registerForm!: UntypedFormGroup;
  submitting = false;
  message = '';

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      },
    );
  }

  onRegister() {
    if (this.submitting) {
      return;
    }

    this.submitting = true;
    this.message = 'Trying to register...';

    const value = this.registerForm.value;

    this.authService.register(value).subscribe({
      next: () => {
        this.submitting = false;
        void this.redirectAfterRegister();
      },
      error: () => {
        this.submitting = false;
        this.message = 'Failed registration';
      },
    });
  }

  private async redirectAfterRegister() {
    if (await this.authService.isLoggedIn()) {
      const redirect = this.authService.redirectUrl
        ? this.router.parseUrl(this.authService.redirectUrl)
        : '/';
      void this.router.navigateByUrl(redirect);
    } else {
      this.message = 'Failed registration';
    }
  }
}
