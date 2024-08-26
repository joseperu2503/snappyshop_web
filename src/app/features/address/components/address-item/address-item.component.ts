import { Component, inject, input } from '@angular/core';
import { Address } from '../../dtos/addresses-response.dto';
import { SvgIconComponent } from 'angular-svg-icon';
import { AddressStore } from '../../stores/address.store';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-address-item',
  standalone: true,
  imports: [SvgIconComponent, MatRippleModule],
  templateUrl: './address-item.component.html',
  styleUrl: './address-item.component.scss',
})
export class AddressItemComponent {
  address = input.required<Address>();
  addressStore = inject(AddressStore);

  editAddress() {
    this.addressStore.openForm(this.address());
  }
}
