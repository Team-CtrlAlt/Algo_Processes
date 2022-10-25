import { QueryTypes } from "sequelize";
import express, { Request, Response } from "express";

import { TableConstants } from "../../constants";
import { NotificationModel } from "../../models/interface/interface.notifications";
import { WalletModel } from "../../models/interface/interface.wallets";
//import DeviceToken from "../../models/model/model.deviceToken";
import Notification from "../../models/model/model.notifications";
import Wallet from "../../models/model/model.wallets";
import db from "../common/db";

//import {stage} "../../config";
import request from "request-promise";

import Withdraw from "../../models/model/model.withdraws";
import { WithdrawModel } from "../../models/interface/interface.withdraws";
import Deposit from "../../models/model/model.deposits";
import { DepositModel } from "../../models/interface/interface.deposits";
import Coins from "../../models/model/model.coins";
import { CoinModel } from "../../models/interface/interface.coins";

class DbHelper {
  /**
   * get wallet id by wallet address
   * @param wallet_address
   * @param coin_id
   * @returns
   */
  public async getWalletIdByAddress(wallet_address: string, coin_id: number): Promise<number | null> {
    try {
      var queryRes = await Wallet.findOne({
        where: { wallet_address, coin_id },
        attributes: ["id"],
        raw: true,
      });
      if (queryRes) return queryRes.id;
      else return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * get user wallet details by wallet address
   * @param wallet_address
   * @param coin_id
   * @returns
   */
  public async getWalletInfoByAddressAndCoinId(wallet_address: string, coin_id: number | undefined): Promise<WalletModel | null> {
    try {
      let queryRes = await Wallet.findOne({
        where: { wallet_address, coin_id },
      });
      if (queryRes) return queryRes;
      else return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Update user db balance on deposit, Dev-SK
   * @param updatedBalance
   * @param walletId
   * @param userId
   * @returns
   */
  public async updateUserDbBalance(updatedBalance: number, walletId: number, userId: number): Promise<boolean> {
    var query = `UPDATE ${TableConstants.WALLETS} SET balance=${updatedBalance} WHERE wallet_id=${walletId} AND user_id=${userId}`;
    var queryRes = await db.query(query, { type: QueryTypes.UPDATE });
    if (queryRes) return true;
    else return false;
  }

  /**
   * get user device tokens
   * @param walletAddress
   * @returns
   */
  public async getUserIdByWalletAddress(walletAddress: string): Promise<number | null> {
    var userData: any = await Wallet.findOne({
      where: { wallet_address: walletAddress },
      attributes: ["device_token"],
    });

    if (userData) return userData[0].user_id;
    else return null;
  }

  /**
   * get user device tokens
   * @param userId
   * @returns
   */

  /**
   * get wallet details by wallet address and coin symbol
   * @param wallet
   * @param coin_symbol
   * @returns
   */

  /**Get BTC Balance in use */
  public async getUserBtcBalance(address: string) {
    var options = {
      uri: process.env.FETCH_BTC_BALANCE + address + "/balance",
      json: true, // Automatically parses the JSON string in the response
    };
    var result = await request(options);
    return result.final_balance / 100000000;
  }

  /**Get BCH Balance */
  public async getUserBchBalance(address: string) {
    address = address.replace("bitcoincash:", "");
    var options = {
      uri: `${process.env.BITCORE_BASE_URL}/BCH/${process.env.BITCORE_NETWORK}/address/${address}/balance`,
      json: true,
    };
    var result = await request(options);
    return result.confirmed / 100000000;
  }

  /**Get LTC Balance */
  public async getUserLtcBalance(address: string) {
    // address = address.replace("bitcoincash:", "");
    var options = {
      uri: `${process.env.CHAIN_SO_URL}/get_address_balance/${process.env.CHAIN_SO_LTC}/${address}`,
      json: true,
    };
    var result = await request(options);
    return Number(result.data.confirmed_balance);
  }

  /**
   * Save Notifications
   * @param notificationData
   * @returns
   */
  public async saveNotification(notificationData: NotificationModel): Promise<NotificationModel> {
    var notification = await Notification.create(notificationData);
    return notification;
  }

  /**
   * save withdraw transactions
   * @param req
   * @returns
   */
  public async saveWithdrawTxDetails(req: Request): Promise<{ status: boolean; data: WithdrawModel | null }> {
    var currentUTCDate: string = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
    var data: any = {
      req_type: req.body.req_type || "APP",
      user_id: req.userId,
      tx_id: req.body.tx_id,
      tx_raw: req.body.tx_raw || null,
      tx_type: req.body.tx_type,
      from_adrs: req.body.from,
      to_adrs: req.body.to,
      coin: req.coininfo.coin_symbol,
      coin_id: req.coininfo.coin_id,
      coin_family: req.coininfo.coin_family,
      amount: req.body.amount,
      // token_id: req.body.token_id,
      nonce: req.body.nonce || 0,
      gas_limit: req.body.gas_estimate || 0,
      gas_price: req.body.gas_price || 0,
      status: req.body.tx_status, //pending', 'done', 'signed', 'failed'
      blockchain_status: req.body.blockchain_status || null,
      block_id: req.body.block_id || 0,
      created_at: currentUTCDate,
      updated_at: currentUTCDate,
    };
    var updateWallet: WithdrawModel = await Withdraw.create(data);

    if (updateWallet) {
      return { status: true, data: updateWallet };
    } else {
      return { status: false, data: null };
    }
  }

  /**
   * is deposit exists
   * @param txid
   * @param toadrs
   * @returns
   */
  public async ifDepositTxExist(txid: string, toadrs: string): Promise<Boolean> {
    var depositTxn = await Deposit.findOne({
      where: { tx_id: txid, to_adrs: toadrs },
      attributes: ["id"],
    });
    if (depositTxn) return true;
    else return false;
  }

  /**
     * is withdraw exists
     * @param txid
     * @returns
    //  */
  public async ifWithdrawTxExist(txid: string): Promise<Boolean> {
    var withdrawTxn = await Withdraw.findOne({
      where: { tx_id: txid },
      attributes: ["id"],
    });
    if (withdrawTxn) return true;
    else return false;
  }

  /**
   * save deposited transactions
   * @param req
   * @returns
   */
  public async depositTxDetailsSave(req: Request): Promise<{ status: boolean; data: DepositModel | string }> {
    await db.sync;
    if (req && req.coininfo) {
      var currentUTCDate: string = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
      var obj = {
        user_id: req.body.user_id,
        from_adrs: req.body.from_address,
        to_adrs: req.body.to,
        tx_id: req.body.tx_id,
        status: "complete",
        coin: req.coininfo.coin_symbol,
        coin_id: req.coininfo.coin_id,
        coin_family: req.coininfo.coin_family,
        amount: req.body.amount,
        block_id: req.body.block_id,
        created_at: currentUTCDate,
        updated_at: currentUTCDate,
      };
      var depositTxn: DepositModel = await Deposit.create(obj);
      if (depositTxn) {
        return { status: true, data: depositTxn };
      } else {
        return { status: false, data: "" };
      }
    } else {
      return { status: false, data: "" };
    }
  }

  /**
   * Get coin detail by coin id from coin type
   * @param coinType
   * @param coinFamily
   * @returns
   */
  public async getCoinData(coinType: string, coinFamily: number): Promise<CoinModel | null> {
    var result: CoinModel | null = await Coins.findOne({
      where: { coin_symbol: coinType, coin_family: coinFamily },
    });
    if (result) return result;
    else return null;
  }
}

const dbHelper = new DbHelper();
export default dbHelper;
