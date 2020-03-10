import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Questions and Answers';
  questions: any = [];
  myForm: FormGroup;

  constructor(private api: ApiService, public fb: FormBuilder) {}

  ngOnInit() {
    this.reactiveForm();
    this.getQuestions();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    const formValue = this.myForm.value;
    if (formValue.question != "" && formValue.answer != ""){
      this.api.postQuestion(formValue.question)
        .subscribe(data => {
          const questionID = data["id"];
          this.api.postAnswer(questionID, formValue.answer)
            .subscribe(data => {
              this.myForm.reset();
              this.getQuestions();
            });
        });
    }
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
