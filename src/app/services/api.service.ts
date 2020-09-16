import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: object;

  constructor(private httpClient: HttpClient) {
    this.headers = {
      headers: {
        'Content-Type': 'Application/json',
        Accept: 'Application/json'
      }
    };
  }

  get(url: string) {
    const base = environment.apiUrl;
    const token = environment.token;

    return this.httpClient
        .get(`${base}/Api_controller/${url}?token=${token}`, this.headers)
        .pipe(take(1));
  }

  post(url: string, payload: object) {
    const base = environment.apiUrl;
    const token = environment.token;

    return this.httpClient
        .post(`${base}/Api_controller/${url}?token=${token}`, payload, this.headers)
        .pipe(take(1));
  }
}
