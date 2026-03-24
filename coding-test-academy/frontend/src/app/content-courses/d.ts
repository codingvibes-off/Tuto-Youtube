import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MenuItem } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';

export interface CourseTheme {
  label: string;
  items?: CourseTheme[];
}
 
export interface CourseData {
  themes: CourseTheme[];
}
@Component({
  selector: 'app-content-courses',
  imports: [HeaderComponent, PanelMenuModule],
  templateUrl: './content-courses.component.html',
  styleUrl: './content-courses.component.css'
})
export class ContentCoursesComponent {
  constructor(private route: ActivatedRoute){}
   @Input() courseData: CourseData | null = null;

  menuItems: MenuItem[] = [];
  selectedTheme: string = '';
  selectedFormat: 'video' | 'script' = 'video';

  private defaultData: CourseTheme[] = [
    {
      label: 'Introduction',
      items: [
        { label: "Qu'est-ce que le test logiciel ?" },
        { label: 'Pourquoi tester ?' },
      ],
    },
    {
      label: 'Cycle de vie logiciel',
      items: [
        {
          label: 'SDLC',
          items: [{ label: 'Cascade' }, { label: 'Agile' }],
        },
        { label: 'STLC' },
      ],
    },
    {
      label: 'Types de tests',
      items: [
        { label: 'Tests unitaires' },
        { label: "Tests d'intégration" },
        { label: 'Tests end-to-end' },
      ],
    },
    {
      label: 'Outils & Frameworks',
      items: [
        { label: 'Jest' },
        { label: 'Cypress' },
        { label: 'Selenium' },
      ],
    },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('title');
    console.log(id);
    });
    const source = this.courseData?.themes ?? this.defaultData;
    this.menuItems = this.buildMenuItems(source);
    // Select first leaf item by default
    if (source.length > 0 && source[0].items && source[0].items.length > 0) {
      this.selectedTheme = source[0].items[0].label;
    } else if (source.length > 0) {
      this.selectedTheme = source[0].label;
    }
  }

  private buildMenuItems(themes: CourseTheme[]): MenuItem[] {
    return themes.map((theme) => ({
      label: theme.label,
      icon: theme.items && theme.items.length ? 'pi pi-folder' : 'pi pi-file',
      items: theme.items ? this.buildMenuItems(theme.items) : undefined,
      command: theme.items?.length
        ? undefined
        : () => this.selectTheme(theme.label),
      expanded: true,
    }));
  }

  selectTheme(label: string): void {
    this.selectedTheme = label;
  }

  setFormat(format: 'video' | 'script'): void {
    this.selectedFormat = format;
  }

}
