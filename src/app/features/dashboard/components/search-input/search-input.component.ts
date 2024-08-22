import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { SearchStore } from '../../../search/stores/search.store';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { RouterLink } from '@angular/router';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  showMenu = signal<boolean>(false);
  searchStore = inject(SearchStore);
  LoadingStatus = LoadingStatus;

  closeMenu() {
    this.showMenu.set(false);
  }

  onFocus() {
    //Para cuando la pagina inicie en search y tenga el searchInput precargado
    if (this.searchStore.searchingProducts() == LoadingStatus.None) {
      this.searchStore.searchProducts(this.searchStore.searchInput());
    }

    // Abre el menu cuando hace focus en el input
    this.openMenu();
  }

  openMenu() {
    this.showMenu.set(true);
  }

  handleSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;

    this.searchStore.searchProducts(input.value);
  }

  viewMoreResults() {
    this.closeMenu();
    this.searchStore.viewMoreResults();
  }

  onSubmit() {
    if (this.searchStore.searchInput() != '') {
      this.viewMoreResults();
    }
  }
}
