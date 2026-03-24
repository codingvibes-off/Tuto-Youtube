import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MenuItem } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { COURSE_DATA_MANUAL_TESTING } from './content-menu-tree-files/course-data-manual-testing';

export interface CourseTheme {
  label: string;
  items?: CourseTheme[];
}
export interface CourseData {
  themes: CourseTheme[];
}
@Component({
  selector: 'app-content-courses',
  standalone: true,
  imports: [CommonModule, HeaderComponent, PanelMenuModule],
  templateUrl: './content-courses.component.html',
  styleUrl: './content-courses.component.css'
})
export class ContentCoursesComponent implements OnInit {

  @Input() courseData: CourseData | null = null;

  menuItems: MenuItem[] = [];
  selectedTheme: string = '';
  selectedFormat: 'video' | 'script' = 'video';
  private defaultData: CourseTheme[] = COURSE_DATA_MANUAL_TESTING
  constructor(private route: ActivatedRoute) {
    // Initialisation ici → disponible dès le premier rendu du template
    const source = this.defaultData;
    this.menuItems = this.buildMenuItems(source, true);
    this.selectedTheme = source[0]?.items?.[0]?.label ?? source[0]?.label ?? '';
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const content_course_title = params.get('title');
      switch(content_course_title){
        case "testing_manual":
         this.defaultData = COURSE_DATA_MANUAL_TESTING
      }
      
    });

    // Si un @Input() courseData est fourni, on l'utilise à la place des données par défaut
    if (this.courseData) {
      const source = this.courseData.themes;
      this.menuItems = this.buildMenuItems(source, true);
      this.selectedTheme = source[0]?.items?.[0]?.label ?? source[0]?.label ?? '';
    }
  }

  private buildMenuItems(themes: CourseTheme[], isRoot = false): MenuItem[] {
    return themes.map((theme) => {
      const hasChildren = !!(theme.items && theme.items.length > 0);

      const item: MenuItem = {
        label: theme.label,
        icon: hasChildren ? 'pi pi-folder' : 'pi pi-file',
      };

      if (hasChildren) {
        // Nœud parent : on passe les enfants et on force l'expansion au niveau racine
        item.items = this.buildMenuItems(theme.items!);
        if (isRoot) {
          item.expanded = true;
        }
      } else {
        // Nœud feuille : on attache le command
        item.command = () => this.selectTheme(theme.label);
      }

      return item;
    });
  }

  selectTheme(label: string): void {
    this.selectedTheme = label;
  }

  setFormat(format: 'video' | 'script'): void {
    this.selectedFormat = format;
  }
}
