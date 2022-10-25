export enum ErrorMessages {
  WALLET_CREATION_FAILED = "Unable to create wallet. Please try again later or contact support",
  ERC20_TOKEN_SEARCH = "Unable to fetch ERC20 token. Please contact support",
  ERC20_TOKEN_ADD = "Unable to add ERC20 token. Please contact support",
  BEP20_TOKEN_SEARCH = "Unable to fetch BEP20 token. Please contact support",
  BEP20_TOKEN_ADD = "Unable to add BEP20 token. Please contact support",
  TRC20_TOKEN_SEARCH = "Unable to fetch TRC20 token. Please contact support",
  INSUFFICIENT_BALANCE = "You have insufficient balance to perform this transaction.",
  INVALID_ADDRESS = "The wallet address provided in invalid",
  WALLET_EXISTS = "The wallet address provided already exists.",
  TOKEN_EXISTS = "The token address provided already exists.",
  WALLET_TOKEN_EXISTS = "",
  DEPOSIT_EXISTS = "Deposit already exists.",
  WITHDRAW_EXISTS = "Withdraw already exists.",
  TX_ALREADY_UPDATED = "Withdraw already updated.",
  WALLET_NOT_EXIST = "Wallet address provided does not exists",
  INVALID_USER = "Invalid user details.",
  TRANSACTION_BROADCAST_FAILED = "Transaction processed, but unable to update record.",
  ERROR_WHILE_BROADCAST = "Error in broadcasting at this moment, contact with support.",
  ERROR_WHILE_UPDATE_BTC_BALANCE = "Issue updating user btc deposit balance!",
  ERROR_WHILE_UPDATE_BTC_DEPOSIT ='Issue executing btc deposit!',
  BTC_DEPOSIT_CATCH_ERROR ="In catch, there is some error executing btc deposit webhook!, error: ",
  TOKENS_NOT_FOUND = "Token not found",
  WITHDRAW_ALREADY_PROCESSES = "Withdraw txid already processed.",
  ERROR_WHILE_UPDATE_STATUS = "'Error updating trnx status.'.",
  SOMETHING_WENT_WRONG = "Something went wrong!",
  INVALID_COIN_FAMILY = "Invalid coin family.",
  INVALID_TO_ADDRESS = "To wallet is not a valid address."

}
