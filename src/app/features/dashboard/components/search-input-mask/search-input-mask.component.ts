import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-search-input-mask',
  standalone: true,
  imports: [SvgIconComponent, RouterLink],
  templateUrl: './search-input-mask.component.html',
  styleUrl: './search-input-mask.component.scss',
})
export class SearchInputMaskComponent {}
