import { RabbitMQQueues } from "../../constants/rabbitMqQueues.constants";
import Sequelize from "sequelize";
import database from "../../config/db";
import rabbitMq from "../../config/rabbitMq";

class ETHPendingWithdrawalProcess {
  public getTransactionFromDB = async () => {
    const query = `SELECT tx_id, coin_id FROM trnx_withdraws WHERE status = 'complete' AND ( blockchain_status ='' OR blockchain_status is NULL ) AND coin_family=${process.env.COIN_FAMILY}`;
    const tx: { tx_id: string; coin_id: number }[] = await database.db.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });

    if (tx.length > 0) {
      for await (const el of tx) {
        await this.addTxToQueue(el);
      }
    }
  };

  public addTxToQueue = async (data: { tx_id: string; coin_id: number }) => {
    await rabbitMq.assertQueue(process.env.PENDING_WITHDRAWAL_TX_PROCESS || "");
    await rabbitMq.sendToQueue(process.env.PENDING_WITHDRAWAL_TX_PROCESS || "", Buffer.from(JSON.stringify(data)));
  };
}

const ethPendingWithdrawalProcess = new ETHPendingWithdrawalProcess();
export default ethPendingWithdrawalProcess;
