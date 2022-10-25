declare namespace Express {
  import { AbiItem } from "web3-utils";
  export interface Request {
    userId: string;
    txnData: any;
    coininfo: {
      token_abi: AbiItem[] | string;
      token_address: string | null | undefined;
      decimals: number;
      is_token: boolean;
      token_type: string | null;
      coin_id: number;
      coin_symbol: string;
      coin_family: number;
    };
  }
  export interface Response {
    userId: string;
  }
}
