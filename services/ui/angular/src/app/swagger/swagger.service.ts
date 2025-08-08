import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type SwaggerConfig = Record<string, any>;

@Injectable({
  providedIn: 'root',
})
export class SwaggerService {
  private readonly http = inject(HttpClient);

  getConfig(): Observable<SwaggerConfig> {
    return this.http.get<SwaggerConfig>('api/docs');
  }
}
