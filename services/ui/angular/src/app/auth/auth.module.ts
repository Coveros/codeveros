import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LoginComponent, AuthComponent, RegisterComponent],
  imports: [BrowserAnimationsModule, SharedModule, AuthRoutingModule],
  exports: [AuthComponent],
})
export class AuthModule {}
