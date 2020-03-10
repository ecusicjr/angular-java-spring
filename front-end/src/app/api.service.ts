import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = '/api/v0';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get(apiUrl + '/questions');
  }
}
