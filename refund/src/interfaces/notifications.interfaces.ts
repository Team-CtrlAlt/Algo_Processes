export interface NotificationInterface {
    token?: Array<{ device_token: string }> | Array<string> | string;
    subject:string
    title: string;
    message: string;
    notification_type?: string;
    tx_id?: string;
    tx_type?: string;
    to_user_id?: string;
    device_token?:string
    // user_coin_id?: number;
    // userName?: string;
    // wallet?: string;
    // thread?: string;
}
