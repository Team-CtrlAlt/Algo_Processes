export interface BankDetailModel {
    id?: string,
    bank_name:string,
    acc_no:string,
    ifsc_code:string,
    branch_name:string,
    payment_method:string,
    user_id:string,
    primary_account?:boolean
}