import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-social-button',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule,
    SvgIconComponent,
  ],
  templateUrl: './social-button.component.html',
  styleUrl: './social-button.component.scss',
})
export class SocialButtonComponent {
  loading = input<boolean>(false);
}
