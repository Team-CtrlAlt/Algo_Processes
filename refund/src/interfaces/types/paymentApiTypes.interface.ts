// Generated by https://quicktype.io

export interface PaymentAPIType {
    type:           string;
    currency?:       string;
    from:           From;
    project_id:     string;
    fee_flat?:       number;
    fee_percentage?: number;
    settlements:    Settlement[];
    metadata?:       Metadata;
}

export interface From {
    id?:           string;
    email:        string;
    type?:         string;
    name?:         string;
    address?:      Address;
    bank_account?: { [key: string]: string };
    metadata?:     Metadata;
}

export interface Address {
    type:           string;
    address_line_1: string;
    address_line_2: string;
    town_city:      string;
    region:         string;
    postal_code:    string;
    country:        string;
}

export interface Metadata {
}

export interface Settlement {
    id?:             string;
    type:           string;
    to?:             From;
    amount:         number;
    description:    string;
    summary:        string;
    fee_flat?:       number;
    fee_percentage?: number;
    required_by?:    string;
    release_at?:     string;
    metadata?:       Metadata;
}
