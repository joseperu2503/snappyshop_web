import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStepperComponent } from './button-stepper.component';

describe('ButtonStepperComponent', () => {
  let component: ButtonStepperComponent;
  let fixture: ComponentFixture<ButtonStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
