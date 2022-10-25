import { Sequelize, Op, QueryTypes } from "sequelize";
import axios from "axios";
import { CoinModel as CoinInstance } from "../../models/interface/interface.coins";
import TBL_FIAT_CURRENCY from "../../models/model/model.currencyFiat";
import TBL_COIN_PRICE_IN_FIAT from "../../models/model/model.coinPriceInFiat";
import TBL_COIN_COUNT_LIMIT from "../../models/model/model.coinLimitCount";
import TBL_COINS from "../../models/model/model.coins";

class CommonHelper {
  constructor() {}
  public async getCoinsAlias(offset: number = 0): Promise<string> {
    let coinData = await TBL_COINS.findAndCountAll({
      attributes: ["coin_gicko_alias"],
      where: {
        [Op.and]: {
          coin_status: 1,
          coin_gicko_alias: {
            [Op.ne]: null, // Like: sellDate IS NOT NULL
          },
        },
      },
      order: [["coin_id", "DESC"]],
      offset: offset,
      limit: 10,
    });
    //coinAlias = [];
    let coin_gicko_alias: string = "";
    if (coinData.count > 0) {
      //coin_gicko_alias = coinAlias.concat(coinData.rows);
      for (let coin of coinData.rows) {
        if (coin.coin_gicko_alias != "") {
          if (coin_gicko_alias == "") {
            coin_gicko_alias = coin.coin_gicko_alias;
          } else {
            coin_gicko_alias += `,${coin.coin_gicko_alias}`;
          }
        }
      }
      return coin_gicko_alias;
    } else {
      return coin_gicko_alias;
    }
  }
  public updateFiatCoinPrice = async (data: CoinInstance | string) => {
    try {
      var ids: string = "";
      var coin_limit_count = 0;
      var fiatCurrency = await TBL_FIAT_CURRENCY.findAll({
        attributes: ["currency_code"],
      });
      //console.log("fiatCurrency:",fiatCurrency);
      if (data == "") {
        var findCoinCounter = await TBL_COIN_COUNT_LIMIT.findOne({
          where: {
            type: 0,
          },
        });

        if (findCoinCounter) {
          coin_limit_count = findCoinCounter.counter;
        }

        console.log('coin_limit_count', coin_limit_count)

        ids = await commonHelper.getCoinsAlias(coin_limit_count);

        var totalCoins = await TBL_COINS.count({
          where: {
            [Op.and]: {
              coin_status: 1,
              coin_gicko_alias: {
                [Op.ne]: null, // Like: sellDate IS NOT NULL
              },
            },
          },
        });

        if (totalCoins > coin_limit_count) {
          var updateCount = await TBL_COIN_COUNT_LIMIT.update(
            { counter: coin_limit_count + 0 },
            {
              where: {
                type: 0,
              },
            }
          );
        } else {
          
          var updateCount = await TBL_COIN_COUNT_LIMIT.update(
            { counter: 1 },
            {
              where: {
                type: 0,
              },
            }
          );
        }

        // ids = await db_helper.getCoinsAlias(coin_limit_count);
      } else {
        if (typeof data === "object") {
          ids = data.coin_gicko_alias;
        }
      }

      console.log("ids:=================>>>>", ids);
      var j = 1;
      if (ids != "") {
        // console.log("IN IF:");
        let index = 0;
        var url: string = "https://api.coingecko.com/api/v3/coins/markets";

        for await (let fiat_currency of fiatCurrency) {
          var currencyInFiat = fiat_currency.currency_code;
          //console.log("currencyInFiat:",currencyInFiat);
          var options = {
            params: {
              ids: `${ids}`,
              vs_currency: currencyInFiat,
            },
          };
          // console.log("options:",options);
          await axios.get(url, options).then(async (result) => {
            console.log("coingecko:", result.data);
            for (var i = 0; i < result.data.length; i++) {
              console.log("==============", i, "==================");
              if (data != "" && currencyInFiat.toLowerCase() == "gbp") {
                await TBL_COINS.update(
                  {
                    coin_image: result.data[i].image,
                  },
                  {
                    where: {
                      coin_id: typeof data === "object" ? data.coin_id : "",
                    },
                  }
                );
              }

              var checkCoinExist = await TBL_COIN_PRICE_IN_FIAT.findOne({
                where: {
                  coin_type: result.data[i].symbol,
                  fiat_type: currencyInFiat.toLowerCase(),
                },
              });
              if (!checkCoinExist) {
                await TBL_COIN_PRICE_IN_FIAT.create({
                  coin_type: result.data[i].symbol,
                  fiat_type: currencyInFiat.toLowerCase(),
                  value: result.data[i].current_price,
                  price_change_24h: result.data[i].price_change_percentage_24h,
                  price_change_percentage_24h: result.data[i].price_change_percentage_24h,
                  market_cap: result.data[i].market_cap,
                  circulating: result.data[i].circulating_supply,
                  total_supply: result.data[i].total_supply,
                  rank: result.data[i].market_cap_rank,
                  volume_24h: result.data[i].market_cap_change_24h,
                  max_supply: result.data[i].max_supply,
                  roi: result.data[i].roi ? result.data[i].roi.times : 0,

                  open: 0,
                  high: result.data[i].high_24h,
                  average: (result.data[i].high_24h + result.data[i].low_24h) / 2,
                  close: 0,
                  low: result.data[i].low_24h,
                  change_price: result.data[i].price_change_24h,
                });
                // coint table update images if coin symobo is usd

                //
              } else {
                await TBL_COIN_PRICE_IN_FIAT.update(
                  {
                    value: result.data[i].current_price,
                    price_change_24h: result.data[i].price_change_percentage_24h,
                    price_change_percentage_24h: result.data[i].price_change_percentage_24h,
                    market_cap: result.data[i].market_cap,
                    circulating: result.data[i].circulating_supply,
                    total_supply: result.data[i].total_supply,
                    rank: result.data[i].market_cap_rank,
                    volume_24h: result.data[i].market_cap_change_24h,
                    max_supply: result.data[i].max_supply,
                    roi: result.data[i].roi ? result.data[i].roi.times : 0,
                    open: 0,
                    high: result.data[i].high_24h,
                    average: (result.data[i].high_24h + result.data[i].low_24h) / 2,
                    close: 0,
                    low: result.data[i].low_24h,
                    change_price: result.data[i].price_change_24h,
                  },
                  {
                    where: {
                      coin_type: result.data[i].symbol,
                      fiat_type: currencyInFiat.toLowerCase(),
                    },
                  }
                );
              }
            }
          });
          index++;
        }
      }
      console.log({ status: true, message: "Coin Price update successfully." });
      return;
    } catch (error) {
      console.log("updateCoinPrice error:", error);
      return;
    }
  };
}

const commonHelper = new CommonHelper();
export default commonHelper;
