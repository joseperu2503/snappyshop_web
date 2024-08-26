export interface AddressRequest {
  readonly address: string;
  readonly country: string;
  readonly locality: string;
  readonly postal_code: string;
  readonly plus_code: string;
  readonly detail: string;
  readonly recipient_name: string;
  readonly phone: string;
  readonly references: string;
  readonly latitude: number;
  readonly longitude: number;
}
