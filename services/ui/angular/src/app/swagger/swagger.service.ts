import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type SwaggerConfig = Record<string, any>;

@Injectable({
  providedIn: 'root',
})
export class SwaggerService {
  constructor(private http: HttpClient) {}

  getConfig(): Observable<SwaggerConfig> {
    return this.http.get<SwaggerConfig>('api/docs');
  }
}
