export interface Address {
  readonly id: number;
  readonly address: string;
  readonly detail: string;
  readonly phone: string;
  readonly recipient_name: string;
  readonly references: null | string;
  readonly latitude: number;
  readonly longitude: number;
  readonly default: boolean;
  readonly country: string;
  readonly locality: string;
  readonly plus_code: string;
  readonly postal_code: string;
}

export interface AddressResult {
  readonly place_id: string;
  readonly structured_formatting: StructuredFormatting;
}

interface StructuredFormatting {
  readonly main_text: string;
  readonly secondary_text: string;
}

export interface PlaceDetails {
  readonly location: Location;
  readonly viewport: Viewport;
}

interface Location {
  readonly lat: number;
  readonly lng: number;
}

interface Viewport {
  readonly northeast: Location;
  readonly southwest: Location;
}

export interface GeocodeResponse {
  readonly address: string;
  readonly country: string;
  readonly locality: string;
  readonly postal_code: string;
  readonly plus_code: string;
}
