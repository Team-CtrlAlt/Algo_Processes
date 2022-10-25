import { TinyIntegerDataType } from "sequelize/types";

export interface UserModel {
  id?: string;
  currency_fiat_id?:number;
  first_name: string;
  last_name: string;
  mobile_no?: string;
  device_id?: string;
  pin?: string;
  role: number;
  image?:string;
  email?: string;
  kycStatus?:number;
  iat: number;
  client_secret?:string;
  forgotPasswordHash?:string;
  google2fa_secret?:string;
  google2fa_status?:number;
  participant_id?:string;
  created_at?:string
}
