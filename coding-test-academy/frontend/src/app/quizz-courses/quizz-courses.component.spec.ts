import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzCoursesComponent } from './quizz-courses.component';

describe('QuizzCoursesComponent', () => {
  let component: QuizzCoursesComponent;
  let fixture: ComponentFixture<QuizzCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
