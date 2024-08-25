import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { AdressesResponse } from '../dtos/addresses-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private api = inject(ApiService);

  getAddresses() {
    return this.api.get<AdressesResponse>(`addresses/my-addresses`);
  }

  searchAddresses(query: string) {
    const httpParams = new HttpParams().set('query', query);

    return this.api.get<GoogleMapsAutocompleteResponse>(
      `addresses/autocomplete`,
      httpParams
    );
  }

  getPlaceDetails(placeId: string): Observable<any> {
    const httpParams = new HttpParams().set('place_id', placeId);

    return this.api.get<GoogleMapsAutocompleteResponse>(
      `addresses/details`,
      httpParams
    );
  }
}

export interface GoogleMapsAutocompleteResponse {
  readonly predictions: Prediction[];
}

export interface Prediction {
  readonly description: string;
  readonly matched_substrings: MatchedSubstring[];
  readonly place_id: string;
  readonly reference: string;
  readonly structured_formatting: StructuredFormatting;
  readonly terms: Term[];
  readonly types: string[];
}

export interface MatchedSubstring {
  readonly length: number;
  readonly offset: number;
}

export interface StructuredFormatting {
  readonly main_text: string;
  readonly main_text_matched_substrings: MatchedSubstring[];
  readonly secondary_text: string;
}

export interface Term {
  readonly offset: number;
  readonly value: string;
}

export interface PlaceDetail {
  readonly result: Result;
  readonly status: string;
}

export interface Result {
  readonly formatted_address: string;
  readonly geometry: Geometry;
}

export interface Geometry {
  readonly location: Location;
  readonly viewport: Viewport;
}

export interface Location {
  readonly lat: number;
  readonly lng: number;
}

export interface Viewport {
  readonly northeast: Location;
  readonly southwest: Location;
}
