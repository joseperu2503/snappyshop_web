import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SearchInputComponent } from '../../../features/dashboard/components/search-input/search-input.component';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SearchInputComponent, SvgIconComponent, RouterOutlet, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
