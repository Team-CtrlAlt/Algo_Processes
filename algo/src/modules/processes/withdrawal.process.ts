import Sequelize from "sequelize";
import { TxType, WebHookTxType } from "../../types/AlgoTokens.types";

import { LogsConstants } from "../../constants/logs.constants";
import { RabbitMQQueues } from "../../constants/rabbitMqQueues.constants";
// import { configuration } from "../../config";
import database from "../../config/db";
import rabbitMq from "../../config/rabbitMq";
import server from "../../config/axios";

class ETHWithdrawProcess {
  public startWithdrawQueue = async () => {
    await rabbitMq.consumeQueue(process.env.WITHDRAW_QUEUE_BLOCKS_PROCESS as string, this.checkIfOurTx);
  };

  public checkIfOurTx = async (data: TxType) => {
    let account: {
      coin_id: number;
      coin_family: number;
      token_address: string;
      is_token: number;
    }[];


    if (data.token) {
      const queryIfToken = `SELECT * FROM coins AS co INNER JOIN wallets AS wa ON wa.coin_id=co.coin_id WHERE co.token_address='${data.token}' AND wa.wallet_address LIKE '${data.fromAddress}' AND co.coin_family=${process.env.COIN_FAMILY} LIMIT 1`;
      account = await database.db.query(queryIfToken, {
        type: Sequelize.QueryTypes.SELECT,
      });
    } else {
      const queryIfBnb = `SELECT * FROM coins AS co INNER JOIN wallets AS wa ON wa.coin_id=co.coin_id WHERE co.coin_symbol='${process.env.NETWORK}' AND wa.wallet_address LIKE '${data.fromAddress}' AND co.coin_family=${process.env.COIN_FAMILY} LIMIT 1`;
      account = await database.db.query(queryIfBnb, {
        type: Sequelize.QueryTypes.SELECT,
      });
    }
    if (account.length > 0) {
      const webhookTx: WebHookTxType = {
        coin: {
          coinId: account[0].coin_id,
          coinFamily: account[0].coin_family,
          tokenAddress: account[0].token_address,
        },
        isContract: account[0].is_token,
        tx_id: data.txId,
        to: data.toAddress,
        from_address: data.fromAddress,
        block_id: data.blockId,
        amount: data.amount,
      };
      await this.addTransactionToDB(webhookTx);
    } else {
      console.log(`${LogsConstants.NOT_OUR_WALLET} ${data.txId}`);
    }
  };

  public addTransactionToDB = async (transaction: WebHookTxType) => {
    try {
      let tokenAddress: string = process.env.NETWORK as string;
      if (transaction.isContract == 1) {
        tokenAddress = transaction.coin.tokenAddress;
      }
      const webHookUrlApi = process.env.WEBHOOK_API_WITHDRAW_BLOCK_PROCESS || "";
      const updatedUrl = webHookUrlApi.replace(":coin", tokenAddress);
      const finalApiUrl = process.env.API_URL + updatedUrl;
      await server.post(finalApiUrl, transaction);
      console.log(`Withdraw Transaction successfully added to DB POST ${finalApiUrl}`);
    } catch (error) {
      console.log("catch error withdraw addTransactionToDB :", error);
      console.log(`Withdraw already exists in the database please check the transaction deposit table`);
    }
  };
}
const ethDepositProcess = new ETHWithdrawProcess();
export default ethDepositProcess;
