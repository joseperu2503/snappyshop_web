import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressStore } from '../../stores/address.store';
import { SharedModule } from '../../../../shared/shared.module';
import { AddressItemComponent } from '../../components/address-item/address-item.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-my-addresses',
  standalone: true,
  imports: [FormsModule, SharedModule, AddressItemComponent, ButtonComponent],
  templateUrl: './my-addresses.component.html',
  styleUrl: './my-addresses.component.scss',
})
export default class MyAddressesComponent {
  addressStore = inject(AddressStore);

  ngOnInit() {
    this.addressStore.getAddresses();
  }
}
