import { Component, inject, signal } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddressService, Prediction } from '../../services/address.service';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { UtilService } from '../../../../shared/services/util/util.service';
import { FormsModule } from '@angular/forms';
import { AddressStore } from '../../stores/address.store';
import { SharedModule } from '../../../../shared/shared.module';
import { AddressItemComponent } from '../../components/address-item/address-item.component';

@Component({
  selector: 'app-my-addresses',
  standalone: true,
  imports: [GoogleMapsModule, FormsModule, SharedModule, AddressItemComponent],
  templateUrl: './my-addresses.component.html',
  styleUrl: './my-addresses.component.scss',
})
export default class MyAddressesComponent {
  addressService = inject(AddressService);
  utilService = inject(UtilService);
  addressStore = inject(AddressStore);

  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555,
  };
  zoom = 6;

  addressResults = signal<Prediction[]>([]);
  searchingAddresses = signal<LoadingStatus>(LoadingStatus.None);
  searchInput = signal<string>('');

  ngOnInit() {
    this.addressStore.getAddresses();
  }

  private debounceTimeout: NodeJS.Timeout | null = null;

  handleInput() {
    console.log(this.searchInput());
    this.searchAddresses();
  }

  searchAddresses() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.searchingAddresses.set(LoadingStatus.Loading);

    this.addressResults.set([]);

    if (this.searchInput() == '') {
      this.searchingAddresses.set(LoadingStatus.None);
      return;
    }

    const search = this.searchInput();

    this.debounceTimeout = setTimeout(() => {
      this.searchingAddresses.set(LoadingStatus.Loading);
      this.addressService.searchAddresses(this.searchInput()).subscribe({
        next: (response) => {
          if (search === this.searchInput()) {
            this.addressResults.set(response.predictions);
            this.searchingAddresses.set(LoadingStatus.Sucess);
          }
        },
        error: () => {
          this.utilService.openSnackBar(
            'An error occurred while loading the products.'
          );
          this.searchingAddresses.set(LoadingStatus.Error);
        },
      });
    }, 1000);
  }
}
