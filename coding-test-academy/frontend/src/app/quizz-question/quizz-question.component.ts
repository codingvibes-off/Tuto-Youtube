import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-quizz-question',
  standalone:true,
  imports: [HeaderComponent],
  templateUrl: './quizz-question.component.html',
  styleUrl: './quizz-question.component.css'
})
export class QuizzQuestionComponent {

}
