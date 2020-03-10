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
        this.questions = data['content'];
        this.getAnswers();
      });
  }

  getAnswers() {
    this.questions = this.questions.map(question => {
      const answers: any = [];
      this.api.getAnswers(question.id)
        .subscribe(data => {
          for (const d of (data as any)){
            answers.push({
              text: d.text,
            });
          }
        });
        question.answers = answers;
        return question;
    })
  }
}
