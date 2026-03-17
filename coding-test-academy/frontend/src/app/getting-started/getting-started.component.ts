import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

interface QuizAnswer {
  id: number;
  label: string;
  color: string;
  textColor: string;
}

interface QuizQuestion {
  id: number;
  text: string;
  answers: QuizAnswer[];
}
@Component({
  selector: 'app-getting-started',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css'
})
export class GettingStartedComponent {
  constructor(private router:Router){}
  currentIndex = 0;
  selectedId: number | null = null;
  answered = false;
  finished = false;
  score = 0;

  questions: QuizQuestion[] = [
    {
      id: 1,
      text: 'Quel est ton prochain niveau dans le testing ?',
      answers: [
        { id: 1, label: 'Débutant',      color: '#7C3AED', textColor: '#fff' },
        { id: 2, label: 'Intermédiaire', color: '#4B9B74', textColor: '#fff' },
        { id: 3, label: 'Avancé',        color: '#D2621A', textColor: '#fff' },
        { id: 4, label: 'Expert',        color: '#C084FC', textColor: '#fff' },
      ]
    },
    {
      id: 2,
      text: 'Quel outil utilises-tu pour l\'automatisation E2E ?',
      answers: [
        { id: 1, label: 'Playwright',  color: '#1D7FFF', textColor: '#fff' },
        { id: 2, label: 'Cypress',     color: '#00B894', textColor: '#fff' },
        { id: 3, label: 'Selenium',    color: '#E17055', textColor: '#fff' },
        { id: 4, label: 'Aucun encore',color: '#6C5CE7', textColor: '#fff' },
      ]
    },
    {
      id: 3,
      text: 'Quelle est ta pratique CI/CD principale ?',
      answers: [
        { id: 1, label: 'Jenkins',         color: '#2D3436', textColor: '#fff' },
        { id: 2, label: 'GitHub Actions',  color: '#0984E3', textColor: '#fff' },
        { id: 3, label: 'GitLab CI',       color: '#E84393', textColor: '#fff' },
        { id: 4, label: 'Je débute',       color: '#00B894', textColor: '#fff' },
      ]
    }
  ];

  get current(): QuizQuestion {
    return this.questions[this.currentIndex];
  }

  get progress(): number {
    return Math.round(((this.currentIndex) / this.questions.length) * 100);
  }

  select(id: number): void {
    if (this.answered) return;
    this.selectedId = id;
    this.answered = true;
    this.score++;

    setTimeout(() => {
      this.next();
    }, 700);
  }

  skip(): void {
    if (this.answered) return;
    this.next();
  }

  next(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.selectedId = null;
      this.answered = false;
    } else {
      this.finished = true;
      setTimeout(() => {
        this.router.navigate(['/courses']); // /home correspond au path de HomeComponent
    }, 2000);
    }
  }

  restart(): void {
    this.currentIndex = 0;
    this.selectedId = null;
    this.answered = false;
    this.finished = false;
    this.score = 0;
  }

  isSelected(id: number): boolean {
    return this.selectedId === id;
  }
}
