export interface Apidata {
  email: string;
  name?: string;
  type?: string;
  address?: Address;
  bank_account?: { [key: string]: string };
  metadata?: Metadata;
}

export interface Address {
  type: string;
  address_line_1: string;
  address_line_2: string;
  town_city: string;
  region: string;
  postal_code: string;
  country: string;
}
export interface Release {
  project_id: string;
  amount: number;
  to: { [key: string]: string };
}[]

export interface Metadata {}
