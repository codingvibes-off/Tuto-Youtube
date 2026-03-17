import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home/home.component';
@Component({
  selector: 'app-root',
  imports: [ ButtonModule, RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  sidebarCollapsed = true;
  pageTitle = 'ACCUEIL';

  private pageTitles: Record<string, string> = {
    '/home': 'ACCUEIL',
    '/courses': 'COURS',
    '/quiz': 'QUIZ GLOBAL',
    '/jobs': 'OFFRES EMPLOI'
  };

  constructor(private router: Router) {}
  ngOnInit(): void {
    
  }

}