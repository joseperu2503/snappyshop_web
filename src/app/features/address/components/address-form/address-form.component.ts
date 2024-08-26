import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SvgIconComponent } from 'angular-svg-icon';
import { AddressResult } from '../../dtos/addresses-response.dto';
import { LoadingStatus } from '../../../../core/enums/loading-status.enum';
import { AddressService } from '../../services/address.service';
import { UtilService } from '../../../../shared/services/util/util.service';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    MatDialogModule,
    SvgIconComponent,
    GoogleMapsModule,
    ButtonComponent,
    ReactiveFormsModule,
    InputComponent,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent {
  readonly addressService = inject(AddressService);
  readonly utilService = inject(UtilService);
  @ViewChild(GoogleMap) map: GoogleMap | undefined;
  readonly dialogRef: AddressForm = inject(MatDialogRef<AddressFormComponent>);

  addressResults = signal<AddressResult[]>([]);
  searchingAddresses = signal<LoadingStatus>(LoadingStatus.None);
  loading = signal<LoadingStatus>(LoadingStatus.None);
  LoadingStatus = LoadingStatus;

  searchInput = signal<string>('');
  formStep = signal<'search' | 'map' | 'form'>('search');

  private debounceTimeout: NodeJS.Timeout | null = null;

  handleInput() {
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
            this.addressResults.set(response);
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

  selectAddressResult(addressResult: AddressResult) {
    this.loading.set(LoadingStatus.Loading);
    this.addressService.getPlaceDetails(addressResult.place_id).subscribe({
      next: (response) => {
        this.center.set({
          lat: response.location.lat,
          lng: response.location.lng,
        });
        this.formStep.set('map');
        this.loading.set(LoadingStatus.Sucess);
      },
      error: (error) => {
        this.loading.set(LoadingStatus.Error);
      },
    });
  }

  center = signal<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  zoom = 18;

  matTypeId = google.maps.MapTypeId.TERRAIN;
  mapOtions: google.maps.MapOptions = {
    mapTypeControl: false, // Deshabilita el control de tipo de mapa (incluyendo el satélite)
    streetViewControl: false, // Deshabilita el control de Street View
  };

  onMapIdle() {
    this.loading.set(LoadingStatus.Loading);
    this.addressService
      .geocode(this.center().lat, this.center().lng)
      .subscribe({
        next: (response) => {
          this.form.patchValue({
            address: response.address,
            country: response.country,
            locality: response.locality,
            plus_code: response.global_code,
            postal_code: response.postal_code,
          });
          this.loading.set(LoadingStatus.Sucess);
        },
        error: (error) => {
          this.loading.set(LoadingStatus.Error);
        },
      });
  }

  onCenterChanged() {
    if (this.map) {
      const newCenter = this.map.getCenter()?.toJSON();
      if (
        newCenter &&
        newCenter.lat != this.center().lat &&
        newCenter.lng != this.center().lng
      ) {
        this.center.set(newCenter);
      }
    }
  }

  form = new FormGroup({
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    country: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    locality: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    postal_code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    plus_code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    detail: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    recipientName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    references: new FormControl<string>('', {
      nonNullable: true,
      validators: [],
    }),
  });

  confirmAddress() {
    this.formStep.set('form');
  }

  saveAddress() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(LoadingStatus.Loading);
    this.addressService
      .createAddress({
        address: this.form.getRawValue().address,
        country: this.form.getRawValue().country,
        detail: this.form.getRawValue().detail,
        plus_code: this.form.getRawValue().plus_code,
        latitude: this.center().lat,
        longitude: this.center().lng,
        locality: this.form.getRawValue().locality,
        phone: this.form.getRawValue().phone,
        postal_code: this.form.getRawValue().postal_code,
        recipient_name: this.form.getRawValue().recipientName,
        references: this.form.getRawValue().references,
      })
      .subscribe({
        next: (response) => {
          this.utilService.openSnackBar(response.message);
          this.loading.set(LoadingStatus.Sucess);
          this.dialogRef.close();
        },
        error: (error) => {
          this.loading.set(LoadingStatus.Error);
        },
      });
  }
}

export type AddressForm = MatDialogRef<AddressFormComponent, boolean>;

interface DataPopUpAddressForm {
  addressId: number;
}
