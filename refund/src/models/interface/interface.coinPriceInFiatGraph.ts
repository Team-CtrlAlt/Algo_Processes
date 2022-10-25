export interface CoinPriceInFiatGraphModel {
    id: number,
    coin_type: string,
    fiat_type: string,
    value: number | 0,
    price_change_24h?: number | 0,
    price_change_percentage_24h?: number | 0
}