export interface TransactionModel {
  id?: string;
  userId: string;
  transaction_id: string;
  project_id: string;
  participant_id?: string;
  amount: string;
  proposal_id?: string;
  payment_status?: number;
  responseData: string;
  token_quantity: string;
  refund_status?: number;
}
