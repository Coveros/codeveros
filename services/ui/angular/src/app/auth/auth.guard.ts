import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  async checkLogin(url: string): Promise<boolean> {
    const loggedIn = await this.authService.isLoggedIn();
    if (loggedIn) {
      return true;
    } else {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;

      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }
  }
}
