import { DataTypes, Model, Optional } from "sequelize";

import { CoinModel } from "../interface/interface.coins";
import db from "../../helpers/common/db";

interface CoinCreationModel extends Optional<CoinModel, "coin_id"> {}
interface CoinInstance extends Model<CoinModel, CoinCreationModel>, CoinModel {}

const Coins = db.define<CoinInstance>(
  "coins",
  {
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    coin_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coin_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coin_gicko_alias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coin_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coin_family: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    coin_status: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    is_token: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    token_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    decimals: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    usd_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    withdraw_limit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    token_abi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["coin_id"],
      },
      {
        unique: false,
        fields: ["coin_symbol"],
      },
      {
        unique: false,
        fields: ["coin_gicko_alias"],
      },
      {
        unique: false,
        fields: ["coin_family"],
      },
      {
        unique: false,
        fields: ["coin_status"],
      },
      {
        unique: false,
        fields: ["is_token"],
      },
      {
        unique: false,
        fields: ["token_type"],
      },
      {
        unique: false,
        fields: ["token_address"],
      },
    ],
  }
);

export default Coins;
