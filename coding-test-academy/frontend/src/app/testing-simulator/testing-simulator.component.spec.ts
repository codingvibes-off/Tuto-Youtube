import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingSimulatorComponent } from './testing-simulator.component';

describe('TestingSimulatorComponent', () => {
  let component: TestingSimulatorComponent;
  let fixture: ComponentFixture<TestingSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingSimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
