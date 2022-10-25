import database from "../../config/db";
import Sequelize from "sequelize";
import { AlgoTokens } from "../../types/AlgoTokens.types";
import redisClient from "../../config/redis";
import { promisify } from "util";

class AlgoProcessHelper {
  public algoTokens: AlgoTokens[];

  constructor() {
    // this.fetchAlgoTokens();
    this.algoTokens = [];
  }

  public updateLastBlockProcessed = async (lastBlockProcessed: number) => {
    const updatedBlockNumber = ++lastBlockProcessed;
    redisClient.set(process.env.LAST_BLOCK_NUMBER as string, updatedBlockNumber.toString());
  };

  // public getLastBlockProcessed = async (blockNumber: number) => {
  //   const getAsync = promisify(redisClient.get).bind(redisClient);
  //   const value = await getAsync(process.env.LAST_BLOCK_NUMBER as string);
  //   if (value) return parseInt(value);
  //   redisClient.set(process.env.LAST_BLOCK_NUMBER as string, blockNumber.toString());
  // };
  public getLastBlockProcessed = async (blockNumber: number) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);
    const value = await getAsync(process.env.LAST_BLOCK_NUMBER as string);
    if (value) return parseInt(value);
    redisClient.set(process.env.LAST_BLOCK_NUMBER as string, blockNumber.toString());
  };

  public fetchAlgoTokens = async () => {
    const getTokenQuery = `SELECT coin_symbol,token_address, decimals FROM coins WHERE is_token=1 AND coin_family=${process.env.COIN_FAMILY}`;
    const tokens: AlgoTokens[] = await database.db.query(getTokenQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });
    redisClient.set(process.env.TOKEN_LIST || "", JSON.stringify(tokens));
  };

  public checkIfContract = async (address: string) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);
    const value = await getAsync(process.env.TOKEN_LIST || "");

    const algoTokens: AlgoTokens[] = JSON.parse(value || "[]");
    const token = algoTokens.find((el) => el.token_address.toUpperCase() === address.toUpperCase());

    if (token) return token;
    return null;
  };
}

const algoProcessHelper = new AlgoProcessHelper();
export default algoProcessHelper;
