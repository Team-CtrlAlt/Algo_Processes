// Generated by https://quicktype.io

export interface VerificationType {
    id?:           string;
    type:         string;
    email:        string;
    name:         string;
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
