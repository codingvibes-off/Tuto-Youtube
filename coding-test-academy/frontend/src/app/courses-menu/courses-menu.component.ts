import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-course-menu',
  standalone: true,
  imports: [CommonModule, PanelMenuModule],
  templateUrl: './courses-menu.component.html',
  styleUrls: ['./courses-menu.component.css']
})
export class CoursesMenuComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Fondamentaux',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Introduction',
            items: [
              { label: 'Qu’est-ce que le test logiciel' },
              { label: 'Pourquoi tester' }
            ]
          }
        ]
      },
      {
        label: 'Cycle de vie',
        icon: 'pi pi-refresh',
        items: [
          {
            label: 'SDLC',
            items: [
              { label: 'Cascade' },
              { label: 'Modèle en V' },
              { label: 'Agile' }
            ]
          }
        ]
      },
      {
        label: 'Tests',
        icon: 'pi pi-check-square',
        items: [
          {
            label: 'Fonctionnels',
            items: [
              { label: 'Unitaires' },
              { label: 'Intégration' },
              { label: 'Système' }
            ]
          }
        ]
      }
    ];
  }
}