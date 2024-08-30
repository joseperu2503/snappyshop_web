import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SearchStore } from '../../stores/search.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [SvgIconComponent, CommonModule, ImageComponent],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  searchStore = inject(SearchStore);
  router = inject(Router);

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;

    this.router.navigate(['/search'], {
      queryParams: { q: input.value },
      queryParamsHandling: 'merge',
    });
  }
}
