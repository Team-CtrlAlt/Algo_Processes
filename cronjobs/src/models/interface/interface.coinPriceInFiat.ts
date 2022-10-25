export interface CoinPriceInFiatModel {
    id: number,
    coin_type: string,
    fiat_type: string,
    value: number | 0,
    price_change_24h?: number | 0,
    price_change_percentage_24h?: number | 0
    market_cap: number
    circulating: number
    total_supply: number
    rank: number
    volume_24h: number
    max_supply: number
    roi: number,
    open: number,
    high: number,
    average: number,
    close: number,
    low: number,
    change_price: number
}