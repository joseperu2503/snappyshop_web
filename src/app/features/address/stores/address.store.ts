import { Injectable, inject, signal } from '@angular/core';
import { AddressService } from '../services/address.service';
import { Address } from '../dtos/addresses-response.dto';
import { AuthService } from '../../auth/services/auth.service';
import { LoadingStatus } from '../../../core/enums/loading-status.enum';

@Injectable({
  providedIn: 'root',
})
export class AddressStore {
  private adressService = inject(AddressService);
  loadingStatus = signal<LoadingStatus>(LoadingStatus.None);
  private authService = inject(AuthService);
  addresses = signal<Address[]>([]);

  getAddresses() {
    if (this.loadingStatus() == LoadingStatus.Loading) return;
    if (!this.authService.verifyAuth()) return;

    this.loadingStatus.set(LoadingStatus.Loading);

    this.adressService.getAddresses().subscribe({
      next: (response) => {
        this.loadingStatus.set(LoadingStatus.Sucess);
        this.addresses.set(response.results);
      },
      error: () => {
        this.loadingStatus.set(LoadingStatus.Error);
      },
    });
  }
}
