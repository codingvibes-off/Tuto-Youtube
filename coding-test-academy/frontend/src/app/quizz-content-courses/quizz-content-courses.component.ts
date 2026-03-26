import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export interface Quizz {
  question: string;
  options: string[];
  correctAnswerIndex: number; // ← index de la bonne réponse dans options[]
}

@Component({
  selector: 'app-quizz-content-courses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    RadioButtonModule,
    ProgressBarModule,
  ],
  templateUrl: './quizz-content-courses.component.html',
  styleUrls: ['./quizz-content-courses.component.css'],
  animations: [
    trigger('slideQuestion', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('350ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 0, transform: 'translateX(-40px)' })),
      ]),
    ]),
    trigger('fadeScore', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.92) translateY(20px)' }),
        animate('450ms 100ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ]),
    ]),
    trigger('staggerOptions', [
      transition(':enter', [
        query('.option-item', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          stagger(60, [
            animate('280ms cubic-bezier(0.4, 0, 0.2, 1)',
              style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class QuizzContentCoursesComponent implements OnInit, OnChanges {
  @Input() quizz: Quizz[] = [];
  @Input() set visible(val: boolean) {
  if (val) setTimeout(() => this.resetQuiz(), 0);}
  form!: FormGroup;
  currentIndex = 0;
  submitted = false;
  showResult = false;
  userAnswers: (number | null)[] = [];
  animating = false;
  direction: 'forward' | 'backward' = 'forward';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quizz']) {
      this.resetQuiz();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      answer: [null, Validators.required],
    });
    this.userAnswers = new Array(this.quizz.length).fill(null);
  }

  resetQuiz(): void {
    this.currentIndex = 0;
    this.submitted = false;
    this.showResult = false;
    this.direction = 'forward';
    this.initForm();
  }

  get currentQuestion(): Quizz {
    return this.quizz[this.currentIndex];
  }

  get progress(): number {
    return this.quizz.length > 0
      ? Math.round(((this.currentIndex + 1) / this.quizz.length) * 100)
      : 0;
  }

  get isLastQuestion(): boolean {
    return this.currentIndex === this.quizz.length - 1;
  }

  get isFirstQuestion(): boolean {
    return this.currentIndex === 0;
  }

  get score(): number {
    return this.userAnswers.filter(
      (answer, i) => answer !== null && answer === this.quizz[i]?.correctAnswerIndex
    ).length;
  }

  isCorrect(questionIndex: number): boolean {
    const answer = this.userAnswers[questionIndex];
    return answer !== null && answer === this.quizz[questionIndex]?.correctAnswerIndex;
  }

  get scorePercent(): number {
    return this.quizz.length > 0
      ? Math.round((this.score / this.quizz.length) * 100)
      : 0;
  }

  get scoreLabel(): { emoji: string; label: string; cls: string } {
    const p = this.scorePercent;
    if (p >= 80) return { emoji: '🏆', label: 'Excellent !', cls: 'result-excellent' };
    if (p >= 50) return { emoji: '👍', label: 'Bien joué !', cls: 'result-good' };
    return { emoji: '💪', label: 'Continue à t\'entraîner !', cls: 'result-keep-going' };
  }

  next(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.userAnswers[this.currentIndex] = this.form.value.answer;
    this.direction = 'forward';

    if (this.isLastQuestion) {
      this.showResult = true;
      return;
    }

    this.currentIndex++;
    this.submitted = false;
    const savedAnswer = this.userAnswers[this.currentIndex];
    this.form.setValue({ answer: savedAnswer ?? null });
  }

  previous(): void {
    if (this.isFirstQuestion) return;
    this.userAnswers[this.currentIndex] = this.form.value.answer;
    this.direction = 'backward';
    this.currentIndex--;
    this.submitted = false;
    const savedAnswer = this.userAnswers[this.currentIndex];
    this.form.setValue({ answer: savedAnswer ?? null });
  }

  validate(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    this.userAnswers[this.currentIndex] = this.form.value.answer;
    this.showResult = true;
  }

  restart(): void {
    this.resetQuiz();
  }
}