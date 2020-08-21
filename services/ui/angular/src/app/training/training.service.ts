import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Training} from './training.interface';
import {HttpClient} from '@angular/common/http';
import {TRAINING_CONFIG, TrainingConfig} from './training.config';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private endpoint: string;

  constructor(
    @Inject(TRAINING_CONFIG) trainingConfig: TrainingConfig,
    private http: HttpClient
  ) {
      this.endpoint = trainingConfig.endpoint;
  }

  getAll(): Observable<Training[]> {
    return this.http.get<Training[]>(this.endpoint);
  }

  getTraining(id: string): Observable<Training> {
    return this.http.get<Training>(`${this.endpoint}/${id}`);
  }

  createTraining(newTraining: Training): Observable<Training> {
    return this.http.post<Training>(this.endpoint, newTraining);
  }

  deleteTraining(id: string): Observable<Training> {
    return this.http.delete<Training>(`${this.endpoint}/${id}`);
  }

  updateTraining(id: string, body: { [key: string ]: any}): Observable<Training> {
    return this.http.put<Training>(`${this.endpoint}/${id}`, body);
  }
}
