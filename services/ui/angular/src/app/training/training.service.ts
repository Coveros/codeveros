import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from './training.interface';
import { HttpClient } from '@angular/common/http';
import { TRAINING_CONFIG, TrainingConfig } from './training.config';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private readonly http = inject(HttpClient);
  private readonly config = inject<TrainingConfig>(TRAINING_CONFIG);

  getAll(): Observable<Training[]> {
    return this.http.get<Training[]>(this.config.endpoint);
  }

  getTraining(id: string): Observable<Training> {
    return this.http.get<Training>(`${this.config.endpoint}/${id}`);
  }

  createTraining(newTraining: Training): Observable<Training> {
    return this.http.post<Training>(this.config.endpoint, newTraining);
  }

  deleteTraining(id: string): Observable<Training> {
    return this.http.delete<Training>(`${this.config.endpoint}/${id}`);
  }

  updateTraining(id: string, body: Partial<Training>): Observable<Training> {
    return this.http.put<Training>(`${this.config.endpoint}/${id}`, body);
  }
}
