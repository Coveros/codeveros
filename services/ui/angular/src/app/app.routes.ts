import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthComponent } from './auth/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: WelcomeComponent,
          },
          {
            path: 'training',
            loadChildren: () =>
              import('./training/training.routes').then((m) => m.routes),
          },
          {
            path: 'users',
            loadChildren: () =>
              import('./user/user.routes').then((m) => m.routes),
          },
          {
            path: 'swagger',
            loadChildren: () =>
              import('./swagger/swagger.routes').then((m) => m.routes),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
