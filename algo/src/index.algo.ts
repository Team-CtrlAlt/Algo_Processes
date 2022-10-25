import "dotenv/config";
import algoBlocksProcess from "./modules/processes/blocks.process";
import algoDepositProcess from "./modules/processes/deposit.process";
import algoWithdrawalProcess from "./modules/processes/withdrawal.process";

// import algoPendingWithdrawalProcess from "./modules/processes/pendingTx.process";
// import algoTxStatusUpdateProcess from "./modules/processes/statusUpdate.process";
import schedule from "node-schedule";


class AlgoStartProcess {
  constructor() {
    this.readBlocksProcess();
    this.algoDepositProcess();
    this.algoWithdrawalProcess();
    // this.getPendingWithdrawalTxProcess();
    // this.updateTxStatusProcess();
  }
  public readBlocksProcess() {
    schedule.scheduleJob("*/4 * * * * *", async function () {
      await algoBlocksProcess.readBlocks();
    });
  }

  public async algoDepositProcess() {
    setTimeout(async () => {
      await algoDepositProcess.startDepositQueue();
    }, 10000);
  }

  public async algoWithdrawalProcess() {
    setTimeout(async () => {
      await algoWithdrawalProcess.startWithdrawQueue();
    }, 10000);
  }

  // public getPendingWithdrawalTxProcess() {
  //   schedule.scheduleJob("*/10 * * * * *", async function () {
  //     await algoPendingWithdrawalProcess.getTransactionFromDB();
  //   });
  // }

  // public async updateTxStatusProcess() {
  //   setTimeout(async () => {
  //     await algoTxStatusUpdateProcess.startTxStatusUpdateQueue();
  //   }, 10000);
  // }
}

new AlgoStartProcess();
