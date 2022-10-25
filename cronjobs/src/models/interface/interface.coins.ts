export interface CoinModel {
    coin_id: number;
    coin_name: string;
    coin_symbol: string;
    coin_gicko_alias: string;
    coin_image?: string | null;
    coin_family: number;
    coin_status: number | 0;
    is_token: number | 0;
    token_type: string | null;
    decimals: number | 0;
    usd_price?: number | 1;
    withdraw_limit?: number | 0;
    token_abi?: string | null;
    token_address?: string | null;
    created_at: string;
    updated_at: string;
    uuid?: string;
  }
  