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

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export default class SearchComponent implements OnInit, OnChanges {
  searchStore = inject(SearchStore);

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
