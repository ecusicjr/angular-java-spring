import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get('/questions');
  }

  getAnswers(questionID) {
    return this.http.get(`/questions/${questionID}/answers`)
  }
}
