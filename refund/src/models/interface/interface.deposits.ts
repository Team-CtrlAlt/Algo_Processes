export interface DepositModel {
    id: number,
    user_id: number,
    from_adrs: string,
    to_adrs: string,
    tx_id?: string | null,
    status: string,
    coin: string,
    coin_id: number,
    coin_family: number,
    amount: number,
    block_id: number,
    block_hash?: number | null
}