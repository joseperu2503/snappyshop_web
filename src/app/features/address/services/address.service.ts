import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import {
  Address,
  AddressResult,
  GeocodeResponse,
  PlaceDetails,
} from '../dtos/addresses-response.dto';
import { AddressRequest } from '../dtos/address-request.dto';
import { SuccessResponse } from '../../../shared/dtos/success-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  readonly api = inject(ApiService);

  getAddresses() {
    return this.api.get<Address[]>(`addresses`);
  }

  searchAddresses(input: string) {
    const httpParams = new HttpParams().set('input', input);

    return this.api.get<AddressResult[]>(`addresses/autocomplete`, httpParams);
  }

  getPlaceDetails(placeId: string): Observable<PlaceDetails> {
    const httpParams = new HttpParams().set('place_id', placeId);

    return this.api.get<PlaceDetails>(`addresses/place-details`, httpParams);
  }

  geocode(lat: number, lng: number): Observable<GeocodeResponse> {
    const httpParams = new HttpParams().set('lat', lat).set('lng', lng);

    return this.api.get<GeocodeResponse>(`addresses/geocode`, httpParams);
  }

  createAddress(request: AddressRequest): Observable<SuccessResponse> {
    return this.api.post<SuccessResponse>(`addresses`, request);
  }
}
