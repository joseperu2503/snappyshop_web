export interface AdressesResponse {
  readonly results: Address[];
  readonly info: Info;
}

export interface Info {
  readonly per_page: number;
  readonly current_page: number;
  readonly last_page: number;
  readonly total: number;
}

export interface Address {
  readonly id: number;
  readonly user: User;
  readonly address: string;
  readonly detail: string;
  readonly phone: string;
  readonly recipient_name: string;
  readonly references: null;
  readonly latitude: number;
  readonly longitude: number;
  readonly primary: boolean;
  readonly created_at: Date;
}

export interface User {
  readonly id: number;
  readonly name: string;
}
