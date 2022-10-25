import { DataTypes, Model, Optional } from "sequelize";

import { CoinPriceInFiatModel } from "../interface/interface.coinPriceInFiat";
import db from "../../helpers/common/db";

interface CoinPriceInFiatCreationModel extends Optional<CoinPriceInFiatModel, "id"> {}
interface CoinPriceInFiatInstance extends Model<CoinPriceInFiatModel, CoinPriceInFiatCreationModel>,CoinPriceInFiatCreationModel{}
    //CoinPriceInFiatModel {}
const CoinPriceInFiat = db.define<CoinPriceInFiatInstance>(
      "coin_price_in_fiat",
      {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  coin_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fiat_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  value: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  price_change_24h: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  price_change_percentage_24h: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  market_cap: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  circulating: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  total_supply: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  rank: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  volume_24h: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  max_supply: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  roi: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  open: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  high: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  average: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  close: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  low: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  change_price: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
});

// let CoinPriceInFiatModel = {
//   indexes: [
//     {
//       unique: false,
//       fields: ["coin_type"],
//     },
//     {
//       unique: false,
//       fields: ["fiat_type"],
//     },
//   ],
// };


export default CoinPriceInFiat
