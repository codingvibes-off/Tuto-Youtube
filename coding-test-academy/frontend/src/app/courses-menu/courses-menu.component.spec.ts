import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesMenuComponent } from './courses-menu.component';

describe('CoursesMenuComponent', () => {
  let component: CoursesMenuComponent;
  let fixture: ComponentFixture<CoursesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
