import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GettingStartedComponent } from '../getting-started/getting-started.component';
import { HeaderComponent } from '../header/header.component';
import { CoursesComponent } from '../courses/courses.component';
import { ResultModalComponent } from '../result-modal/result-modal.component';
import { ProfileKey, Profile } from '../models/profile.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GettingStartedComponent, 
    CommonModule, 
    FormsModule,
    HeaderComponent, 
    CoursesComponent, 
    ResultModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedProfile!: Profile;
  profiles: Record<ProfileKey, Profile> = {
    QA_MANUEL: {
      tag: 'QA / TEST MANUEL',
      description: 'Tu es orienté test manuel...',
      link: 'https://example.com/qa-test-manuel'
    },
    AUTOMATION: {
      tag: 'TEST AUTOMATION',
      description: 'Tu automatises les tests...',
      link: 'https://example.com/test-automation'
    },
    DEVOPS: {
      tag: 'QA / DEVOPS',
      description: 'Tu travailles avec CI/CD...',
      link: 'https://example.com/devops'
    },
    ENGINEER: {
      tag: 'ENGINEER AUTOMATION',
      description: 'Tu construis des frameworks...',
      link: 'https://example.com/engineer'
    },
    ISTQB: {
      tag: 'ISTQB',
      description: 'Tu es orienté méthodologie...',
      link: 'https://example.com/istqb'
    }
  };
  finished = false
  response_user: { question: string; answer: string }[] = [];

  calculateProfile(responses: { question: string; answer: string }[]): ProfileKey{
  let score: Record<string, number>= {
    QA_MANUEL: 0,
    AUTOMATION: 0,
    DEVOPS: 0,
    ENGINEER: 0,
    ISTQB: 0
  };

    responses.forEach(r => {
      switch (r.answer) {
        case 'MANUEL': score['QA_MANUEL'] += 2; break;
        case 'AUTOMATISE': score['AUTOMATION'] += 2; break;

        case 'BOITE NOIRE': score['QA_MANUEL'] += 1; break;
        case 'BOITE BLANCHE': score['DEVOPS'] += 1; break;

        case 'BOUCLE': score['DEVOPS'] += 1; break;
        case 'CONDITION': score['QA_MANUEL'] += 1; break;

        case 'TEST STATIQUE': score['ISTQB'] += 2; break;
        case 'DYNAMIQUE': score['AUTOMATION'] += 2; break;

        case 'FLACKY TEST': score['AUTOMATION'] -= 1; break;
        case 'STABLE TEST': score['ENGINEER'] += 2; break;
      }
    });

    return this.getBestProfile(score);
  }
  getBestProfile(score: Record<ProfileKey, number>): ProfileKey {
    const max = Math.max(...Object.values(score));
    const keys = Object.keys(score) as ProfileKey[];
    return keys.find(key => score[key] === max)!;
    }
  onFinished(responses: { question: string; answer: string }[]) {
    this.response_user = responses;
    this.finished = true;
    const key = this.calculateProfile(responses);
    this.selectedProfile = this.profiles[key];
    console.log("HOME RESPONSE")
  }


}



