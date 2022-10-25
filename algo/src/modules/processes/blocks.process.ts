import { Transaction, TransactionReceipt } from "web3-core";

import { LogsConstants } from "../../constants/logs.constants";
// import { MIN_BLOCK_CONFORMATIONS } from "../../config/stage";
import { RabbitMQQueues } from "../../constants/rabbitMqQueues.constants";
import Sequelize from "sequelize";
import { TxType } from "../../types/AlgoTokens.types";
import database from "../../config/db";
import algoProcessHelper from "./process.helper";
import ethWeb3 from "../../helpers/web3.helper";
import rabbitMq from "../../config/rabbitMq";
import algosdk from "algosdk";
import redisClient from "../../config/redis";

class ETHBlocksProcess {
  public minBlockConfirmation: number;
  public RPC_URL: string;
  public algodClient: algosdk.Algodv2;
  public token: {};
  constructor() {
    this.RPC_URL = process.env.ALGO_RPC as string;

    this.token = {
      "X-API-Key": process.env.ALGO_X_API_KEY,
    };
    this.algodClient = new algosdk.Algodv2(this.token, this.RPC_URL, "");
    this.minBlockConfirmation = Number(process.env.MIN_BLOCK_CONFORMATIONS);
  }

  public readBlocks = async () => {
    try {
      const getBlockNumber = await this.algodClient.status().do();
      if (getBlockNumber === undefined) {
        throw new Error("Unable to get node status");
      }
      const latestBlock = getBlockNumber["last-round"];
      const lastBlockToProcess = latestBlock - this.minBlockConfirmation;
      const lastBlockProcessed = (await algoProcessHelper.getLastBlockProcessed(lastBlockToProcess)) as number;
      if (!lastBlockProcessed) return console.log("No block present in redis");
      console.table({
        LATEST_BLOCK: latestBlock,
        MIN_BLOCK_PROCESSED: lastBlockToProcess,
        LAST_BLOCK_PROCESSED: lastBlockProcessed,
        BLOCK_DIFFERENCE: latestBlock - lastBlockProcessed,
      });
      if (lastBlockProcessed <= lastBlockToProcess) {
        await algoProcessHelper.updateLastBlockProcessed(lastBlockProcessed);
        await this.getTxFromBlock(lastBlockProcessed);
      } else {
        return console.log(LogsConstants.BLOCK_NUMBER_EXCEEDING);
      }
    } catch (error) {
      const message = (error as Error).message;
      console.log("catch error readBlocks:", message);
    }
  };

  public getTxFromBlock = async (blockId: number) => {
    let TRX_RPC_URL = process.env.ALGO_RPC_TRANSACTION;
    let indexerClient = new algosdk.Indexer(this.token, TRX_RPC_URL, "");
    try {
      let blockInfo = await indexerClient.lookupBlock(blockId).do();
      const blockTx = blockInfo.transactions;
      blockTx.forEach(async (tx: any) => {
        await this.getTxDetail(tx, blockId);
      });
    } catch (error) {
      const message = (error as Error).message;

      console.log("catch error getTxFromBlock:", message);
    }
  };

  public getTxDetail = async (trnx: any, blockNumber: number) => {
    try {
      if (trnx["payment-transaction"] != undefined) {
        // console.log(
        //   `Transfer detected from ${trnx.sender} to ${trnx["payment-transaction"].receiver} of ${
        //     trnx["payment-transaction"].amount / 1000000
        //   } ALGO with transaction link https://testnet.algoexplorer.io/tx/${trnx.id}`
        // );
        let amount = trnx["payment-transaction"].amount;
        let objData = {
          txId: trnx.id,
          fromAddress: trnx.sender,
          toAddress: trnx["payment-transaction"].receiver,
          token: null,
          amount,
          blockId: blockNumber,
        };
        await this.checkAddressInDB(objData);
      }
      if (trnx["asset-transfer-transaction"] != undefined) {
        // console.log(
        //   `ASA Transfer detected from ${trnx.sender} to ${trnx["asset-transfer-transaction"].receiver} of ${trnx["asset-transfer-transaction"].amount} of asset id ${trnx["asset-transfer-transaction"]["asset-id"]} with transaction link https://testnet.algoexplorer.io/tx/${trnx.id}`
        // );

        let amount = trnx["asset-transfer-transaction"].amount;
        let objData = {
          txId: trnx.id,
          fromAddress: trnx.sender,
          toAddress: trnx["asset-transfer-transaction"].receiver,
          token: trnx["asset-transfer-transaction"]["asset-id"],
          amount,
          blockId: blockNumber,
        };

        await this.checkAddressInDB(objData);
      }
    } catch (error) {
      const message = (error as Error).message;

      console.log("catch error getTxDetail:", message);
    }
  };

  public checkAddressInDB = async (txData: TxType) => {
    try {
      const depositTxQuery = `SELECT id from wallets where wallet_address LIKE '${txData.toAddress}' LIMIT 1`;
      const withdrawalTxQuery = `SELECT id from wallets where wallet_address LIKE '${txData.fromAddress}' LIMIT 1`;

      // console.log("depositTxQuery :",depositTxQuery)
      // console.log("withdrawalTxQuery :",withdrawalTxQuery)

      /**
       * Check if the user exists in the database with the toAddress query
       */
      const depositQuery = await database.db.query(depositTxQuery, {
        type: Sequelize.QueryTypes.SELECT,
      });

      if (depositQuery.length > 0) {
        console.log("Found the user in to (DEPOSIT) tx 😸");
        console.log("process.env.DEPOSIT_QUEUE_BLOCKS_PROCESS :", process.env.DEPOSIT_QUEUE_BLOCKS_PROCESS);

        await this.addTxToQueue(txData, process.env.DEPOSIT_QUEUE_BLOCKS_PROCESS as string);
      }

      /**
       * Check if the user exists in the database with the fromAddress query
       */
      const withdrawalQuery = await database.db.query(withdrawalTxQuery, {
        type: Sequelize.QueryTypes.SELECT,
      });

      if (withdrawalQuery.length > 0) {
        console.log("Found the user in FROM (WITHDRAW) tx 😸");
        console.log("withdrawalQuery:", withdrawalQuery);

        await this.addTxToQueue(txData, process.env.WITHDRAW_QUEUE_BLOCKS_PROCESS as string);
      }
    } catch (error) {
      const message = (error as Error).message;
      console.log("checkAddressInDB", message);
    }
  };

  public addTxToQueue = async (data: TxType, queueName: string) => {
    try {
      await rabbitMq.assertQueue(queueName);
      await rabbitMq.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (error) {
      const message = (error as Error).message;

      console.log("addTxToQueue", message);
    }
  };
}

const ethBlocksProcess = new ETHBlocksProcess();
export default ethBlocksProcess;
