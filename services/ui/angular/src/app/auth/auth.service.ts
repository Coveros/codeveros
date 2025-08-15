import { Injectable, inject } from '@angular/core';
import { of, Observable, firstValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Registration } from './registration.interface';
import { environment } from '../../environments/environment';

interface User {
  _id: string;
  username: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${environment.apiUrl}/auth`;
  private loggedInUser: User | null = null;
  redirectUrl?: string;

  private get token(): string | null {
    return localStorage.getItem('access_token');
  }

  private set token(token: string | null) {
    if (!token) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', token);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    if (!this.token) {
      return false;
    }
    if (this.loggedInUser?._id) {
      return true;
    }

    const user$ = this.http
      .get<User>(`${this.endpoint}/loggedin`)
      .pipe(catchError(() => of(null)));
    const user = await firstValueFrom(user$);
    if (user?._id) {
      this.loggedInUser = user;
      return true;
    }

    this.token = null;
    this.loggedInUser = null;
    return false;
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  login(username: string, password: string): Observable<boolean> {
    this.token = null;
    return this.http
      .post<LoginResponse>(`${this.endpoint}/login`, { username, password })
      .pipe(
        map(({ token, user }) => {
          this.token = token;
          this.loggedInUser = user;
          return !!token;
        }),
      );
  }

  register(registration: Registration): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.endpoint}/register`, registration)
      .pipe(
        map(({ token, user }) => {
          this.token = token;
          this.loggedInUser = user;
          return !!token;
        }),
      );
  }

  logout() {
    this.token = null;
    this.loggedInUser = null;
    this.http.post<void>(`${this.endpoint}/logout`, {});
    this.router.navigate(['/login']);
  }
}
