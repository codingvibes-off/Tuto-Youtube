import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzContentCoursesComponent } from './quizz-content-courses.component';

describe('QuizzContentCoursesComponent', () => {
  let component: QuizzContentCoursesComponent;
  let fixture: ComponentFixture<QuizzContentCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzContentCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzContentCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
