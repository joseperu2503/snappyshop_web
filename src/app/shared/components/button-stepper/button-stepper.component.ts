import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-button-stepper',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './button-stepper.component.html',
  styleUrl: './button-stepper.component.scss',
})
export class ButtonStepperComponent {
  value = input.required<number>();
  onAdd = output<void>();
  onRemove = output<void>();
  type = input<'productDetail' | 'cart'>('productDetail');

  handleAdd() {
    this.onAdd.emit();
  }

  handleRemove() {
    if (this.value() == 1 && this.type() == 'productDetail') return;
    if (this.value() == 0) return;
    this.onRemove.emit();
  }
}
