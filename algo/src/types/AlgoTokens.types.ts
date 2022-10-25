import { TinyIntegerDataType } from "sequelize/types";

export type AlgoTokens = {
  coin_symbol: string;
  token_address: string;
  decimals: number;
};

export type TxType = {
  txId: string;
  fromAddress: string;
  toAddress: string;
  token: AlgoTokens | null
  amount: number;
  blockId: number;
};


export type WebHookTxType = {
  tx_id: string;
  from_address: string;
  to: string;
  amount: number;
  block_id: number;
  coin: {
    coinId: number;
    tokenAddress: string;
    coinFamily: number,
  };
  isContract: number;
};