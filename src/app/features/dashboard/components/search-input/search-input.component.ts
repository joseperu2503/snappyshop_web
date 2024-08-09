import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { SearchStore } from '../../../search/stores/search.store';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    SvgIconComponent,
    SvgIconComponent,
    CommonModule,
    NgClickOutsideDirective,
    ImageComponent,
    RouterLink,
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  showMenu = signal<boolean>(false);
  searchStore = inject(SearchStore);

  closeMenu() {
    this.showMenu.set(false);
  }

  openMenu() {
    this.showMenu.set(true);
  }

  changeInput(event: Event) {
    const input = event.target as HTMLInputElement;

    this.searchStore.changeSearch(input.value);
  }
}
