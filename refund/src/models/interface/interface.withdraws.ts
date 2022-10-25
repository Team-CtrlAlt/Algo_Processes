import { NumberOfAssociations } from "aws-sdk/clients/networkfirewall";

export interface WithdrawModel {
  id: number;
  req_type: string;
  user_id: number;
  tx_id?: string | null;
  tx_raw?: string | null;
  from_adrs: string;
  to_adrs: string;
  tx_type: string;
  coin: string;
  coin_id: number;
  coin_family: number;
  amount: number;
  nonce: number;
  gas_limit: number;
  gas_price: number;
  //eth_gas_price: number;
  status: string;
  blockchain_status?: string | null;
  msg_id?: number | null;
  block_id: number;
  
}
