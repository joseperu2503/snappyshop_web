import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  width = input<string>('100%');
  height = input<string>('auto');
  borderRadius = input<string>('4px');
  lineHeight = input<string>('auto');
}
