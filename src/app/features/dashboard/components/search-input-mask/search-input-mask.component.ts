import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-search-input-mask',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './search-input-mask.component.html',
  styleUrl: './search-input-mask.component.scss',
})
export class SearchInputMaskComponent {}
