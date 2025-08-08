import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly endpoint = `${environment.apiUrl}/user`;

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.endpoint, newUser);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.endpoint}/${id}`);
  }

  updateUser(id: string, body: Record<string, any>): Observable<User> {
    return this.http.put<User>(`${this.endpoint}/${id}`, body);
  }
}
