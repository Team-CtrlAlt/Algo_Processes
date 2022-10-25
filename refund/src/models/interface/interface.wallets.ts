export interface WalletModel {
    id: number,
    user_id: string,
    wallet_name: string,
    wallet_address: string,
    coin_id: number,
    balance: number | string,
    default_wallet:number,
   
}