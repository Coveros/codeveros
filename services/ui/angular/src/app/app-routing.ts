import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

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
              import('./training/training.module').then(
                (m) => m.TrainingModule,
              ),
          },
          {
            path: 'users',
            loadChildren: () =>
              import('./user/user.module').then((m) => m.UserModule),
          },
          {
            path: 'swagger',
            loadChildren: () =>
              import('./swagger/swagger.module').then((m) => m.SwaggerModule),
          },
        ],
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
