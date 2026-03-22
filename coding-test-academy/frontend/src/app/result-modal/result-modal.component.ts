import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Profile, ProfileKey } from '../models/profile.model';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./result-modal.component.css']
})
export class ResultModalComponent {
  @Input() responses: { question: string; answer: string }[] = [];
  @Input() show: boolean = false;
  @Input()
  profile!: Profile;
  constructor(){}
  profileStyles: Record<string, { background: string; color: string; border?: string }> = {
    'QA / TEST MANUEL': {
      background: 'rgba(2, 68, 135, 0.8)',
      color: '#ffffff',
      border: '2px solid #005bb5'
    },
    'TEST AUTOMATION': {
      background: '#28a745',
      color: 'rgb(189, 255, 186);',
      border: '2px solid #1c6c2b'
    },
    'QA / DEVOPS': {
      background: '#ff9800',
      color: 'rgb(255, 222, 186);',
      border: '2px solid #e67600'
    },
    'ENGINEER AUTOMATION': {
      background: '#9c27b0',
      color: 'rgb(246, 186, 255);',
      border: '2px solid #7b1fa2'
    },
    'ISTQB': {
      background: '#f44336',
      color: '#ff8059',
      border: '2px solid #d32f2f'
    }
  };
  profileColors: Record<string, string> = {
    'QA / TEST MANUEL': '#1e90ff',       // bleu
    'TEST AUTOMATION': '#28a745',       // vert
    'QA / DEVOPS': '#ff9800',           // orange
    'ENGINEER AUTOMATION': '#9c27b0',   // violet
    'ISTQB': '#f44336'                  // rouge
  };
  userTags = [
  { tag: 'QA / TEST MANUEL' },
  { tag: 'TEST AUTOMATION' },
  { tag: 'QA / DEVOPS' }
];
  ngOnChanges(changes: SimpleChanges) {
  if (changes['show'] && this.show) {
    console.log(this.profile)
    console.log('Modal ouvert avec réponses :', this.responses);
   }

 
 }
  close() {
    this.show = false;
  }
}