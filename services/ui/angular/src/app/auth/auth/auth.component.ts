import { Component } from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [MatTabGroup, MatTab, LoginComponent, RegisterComponent],
})
export class AuthComponent {}
