import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { TRAINING_CONFIG } from './training/training.config';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';

const apiDomain = environment.apiUrl
  .split('://')
  .pop()
  .split('/', 1)[0] || '/';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: [apiDomain]
      }
    }),
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    {
      provide: TRAINING_CONFIG,
      useValue: {
        endpoint: `${environment.apiUrl}/training`
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
