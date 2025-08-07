import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { TRAINING_CONFIG } from './training/training.config';
import { environment } from '../environments/environment';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const apiDomain = environment.apiUrl.split('://').pop().split('/', 1)[0] || '/';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('access_token'),
          allowedDomains: [apiDomain],
        },
      }),
      CoreModule,
      SharedModule,
      AuthModule,
    ),
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    {
      provide: TRAINING_CONFIG,
      useValue: {
        endpoint: `${environment.apiUrl}/training`,
      },
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
  ],
};
