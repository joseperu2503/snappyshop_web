import { Component, input, output } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-button-stepper',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './button-stepper.component.html',
  styleUrl: './button-stepper.component.scss',
})
export class ButtonStepperComponent {
  value = input.required<number>();
  onAdd = output<void>();
  onRemove = output<void>();
}
