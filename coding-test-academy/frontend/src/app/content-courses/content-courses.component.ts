import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-content-courses',
  imports: [HeaderComponent],
  templateUrl: './content-courses.component.html',
  styleUrl: './content-courses.component.css'
})
export class ContentCoursesComponent {
  constructor(private route: ActivatedRoute){}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('title');
    console.log(id);
    });
  }
}
