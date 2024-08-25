import { Component, input } from '@angular/core';
import { Address } from '../../dtos/addresses-response.dto';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-address-item',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './address-item.component.html',
  styleUrl: './address-item.component.scss',
})
export class AddressItemComponent {
  address = input.required<Address>();
}
