import { RabbitMQQueues } from "../../constants/rabbitMqQueues.constants";
import ethWeb3 from "../../helpers/web3.helper";
import rabbitMq from "../../config/rabbitMq";
import server from "../../config/axios";
import database from "../../config/db";
import Sequelize from "sequelize";

class EthTxStatusUpdateProcess {
  // public webhook = "";
  public startTxStatusUpdateQueue = async () => {
    await rabbitMq.consumeQueue(
      process.env.PENDING_WITHDRAWAL_TX_PROCESS || "",
      this.getTx
    );
  };

  public getTx = async (data: { tx_id: string, coin_id: number }) => {
    const { getTransaction, getTransactionReceipt } = ethWeb3.web3.eth;
    try {
      const transaction = await getTransaction(data.tx_id);
      const transactionReceipt = await getTransactionReceipt(data.tx_id);

      if (transaction.blockNumber) {
        let gasReverted: number | undefined;

        const gasUsed = transactionReceipt.gasUsed
          ? transactionReceipt.gasUsed
          : 0;
        const gasPrice = parseFloat(transaction.gasPrice) || 0;
        const gasTotal = transaction.gas || 0;

        if (gasTotal > 0 && gasUsed > 0) {
          const gasDiff = gasTotal - gasUsed;
          gasReverted = gasPrice * gasDiff;
        }
        if (transactionReceipt.status && transaction.blockHash != null) {
          const txUpdate = {
            coin_id: data.coin_id,
            status: "success",
            txid: transaction.hash,
            gasReverted: gasReverted,
            fromAddress: transactionReceipt.from.toLowerCase(),
          };
          await this.sendTxUpdate(txUpdate);
        } else if (!transactionReceipt.status) {
          const txUpdate = {
            coin_id: data.coin_id,
            status: "failed",
            txid: transaction.hash,
            gasReverted: gasReverted,
            fromAddress: transactionReceipt.from.toLowerCase(),
          };
          await this.sendTxUpdate(txUpdate);
        }
      }
    } catch (error) {
      const message = (error as Error).message;
      console.log("catch error getTx:",message);
    }
  };

  public sendTxUpdate = async (txData: {
    coin_id: number;
    status: string;
    txid: string;
    gasReverted: number | undefined;
    fromAddress: string;
  }) => {
    try {
      const currencyQuery = `SELECT IF(is_token=1, token_address, coin_symbol) as coin_symbol FROM coins WHERE coin_id = ${txData.coin_id}`;

      const currency: { coin_symbol: string }[] = await database.db.query(
        currencyQuery,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      const webHookUrlApi = process.env.WEBHOOK_API_WITHDRAW_CONFIRMED_PROCESS || "";

      const updatedUrl = webHookUrlApi.replace(":coin", currency[0].coin_symbol);

      const finalApiUrl = process.env.API_URL + updatedUrl;
      // this.webhook = finalApiUrl;

      await server.post(finalApiUrl, txData);
      return;
    } catch (error) {
      const message = (error as Error).message;

      return console.log("catch error sendTxUpdate: ",message);
    }
  };
}

const ethTxStatusUpdateProcess = new EthTxStatusUpdateProcess();
export default ethTxStatusUpdateProcess;
