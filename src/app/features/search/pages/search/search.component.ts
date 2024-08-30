import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import { ProductItemComponent } from '../../../product/components/product-item/product-item.component';
import { SearchStore } from '../../stores/search.store';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ProductSkeletonComponent } from '../../../product/components/product-skeleton/product-skeleton.component';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ProductItemComponent,
    SearchInputComponent,
    ProductSkeletonComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export default class SearchComponent implements OnInit, OnChanges {
  searchStore = inject(SearchStore);
  LoadingStatus = LoadingStatus;
  public q = input<string>('q');

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.searchStore.changeFilter({
      search: this.q(),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['q'] && changes['q'].previousValue) {
      this.getProducts();
    }
  }
}
