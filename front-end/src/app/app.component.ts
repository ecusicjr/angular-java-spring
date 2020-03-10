import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Questions and Answers';
  questions: any = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.api.getQuestions()
      .subscribe(data => {
        console.log(data);
      });
  }
}
