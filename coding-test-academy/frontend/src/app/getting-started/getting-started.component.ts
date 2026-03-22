import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CoursesComponent } from '../courses/courses.component';
import { ResultModalComponent } from '../result-modal/result-modal.component';

interface AnswerOption {
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  standalone:true,
  imports:[CommonModule],
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent {
  @Output() finishedEvent = new EventEmitter<{ question: string; answer: string }[]>();
  // Liste des questions avec leurs réponses possibles
  answer_getting_started: { question: string; options: AnswerOption[] }[] = [
    {
      question: 'Quel est ton mode de test préféré ?',
      options: [
        { label: 'MANUEL', value: 'MANUEL', bgColor: '#000', textColor: '#fff' },
        { label: 'AUTOMATISE', value: 'AUTOMATISE', bgColor: '#fff', textColor: '#000' }
      ]
    },
    {
      question: 'Type de boite ?',
      options: [
        { label: 'BOITE NOIRE', value: 'BOITE NOIRE', bgColor: '#000', textColor: '#fff' },
        { label: 'BOITE BLANCHE', value: 'BOITE BLANCHE', bgColor: '#fff', textColor: '#000' }
      ]
    },
    {
      question: 'Type de boucle ?',
      options: [
        { label: 'BOUCLE', value: 'BOUCLE', bgColor: '#000', textColor: '#fff' },
        { label: 'CONDITION', value: 'CONDITION', bgColor: '#fff', textColor: '#000' }
      ]
    },
    {
      question: 'Type de test ?',
      options: [
        { label: 'TEST STATIQUE', value: 'TEST STATIQUE', bgColor: '#000', textColor: '#fff' },
        { label: 'DYNAMIQUE', value: 'DYNAMIQUE', bgColor: '#fff', textColor: '#000' }
      ]
    },
    {
      question: 'Fiabilité ?',
      options: [
        { label: 'FLACKY TEST', value: 'FLACKY TEST', bgColor: '#000', textColor: '#fff' },
        { label: 'STABLE TEST', value: 'STABLE TEST', bgColor: '#fff', textColor: '#000' }
      ]
    }
  ];
  finished = false
  currentQuestionIndex = 0;
  response_user: { question: string; answer: string }[] = [];
  showModal = true;
   selectAnswer(option: AnswerOption) {
    const currentQuestion = this.answer_getting_started[this.currentQuestionIndex];
    this.response_user.push({ question: currentQuestion.question, answer: option.value });

    // Masquer la modale
    this.showModal = false;

    // Passer à la question suivante après un petit délai pour animation
    setTimeout(() => {
      this.currentQuestionIndex++;
      this.showModal = this.currentQuestionIndex < this.answer_getting_started.length;
    }, 300);

    // Afficher le tableau en console si c’est la dernière réponse
    if (this.currentQuestionIndex >= this.answer_getting_started.length - 1) {
      console.table(this.response_user);
      this.finishedEvent.emit(this.response_user);
    }
  }
}