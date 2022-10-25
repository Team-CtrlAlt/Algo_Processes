import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";

import { WithdrawModel } from "../interface/interface.withdraws";
import db from "../../helpers/common/db";

interface WithdrawCreationModel extends Optional<WithdrawModel, "id"> {}
interface WithdrawInstance extends Model<WithdrawModel, WithdrawCreationModel>, WithdrawModel {}

const Withdraw = db.define<WithdrawInstance>(
  "trnx_withdraws",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    req_type: {
      type: DataTypes.ENUM("APP", "EXNG"),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    tx_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tx_raw: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    from_adrs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_adrs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tx_type: {
      type: DataTypes.ENUM("WITHDRAW", "FREEZE_BANDWIDTH", "FREEZE_ENERGY", "UNFREEZE_BANDWIDTH", "UNFREEZE_ENERGY"),
      allowNull: false,
    },
    coin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coin_family: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    nonce: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gas_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gas_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    // eth_gas_price: {
    //   type: DataTypes.DOUBLE,
    //   allowNull: false,
    // },
    status: {
      type: DataTypes.ENUM("pending", "complete", "signed", "failed", "rejected", "in-progress", "approved", "cancelled"),
      allowNull: false,
    },
    blockchain_status: {
      type: DataTypes.ENUM("FAILED", "CONFIRMED"),
      allowNull: true,
    },
    block_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["user_id"],
      },
      {
        unique: false,
        fields: ["from_adrs"],
      },
      {
        unique: false,
        fields: ["to_adrs"],
      },
      {
        unique: false,
        fields: ["tx_id"],
      },
      {
        unique: false,
        fields: ["tx_type"],
      },
      {
        unique: false,
        fields: ["status"],
      },
      {
        unique: false,
        fields: ["coin_id"],
      },
      {
        unique: false,
        fields: ["coin_family"],
      },
      {
        unique: false,
        fields: ["coin"],
      },
    ],
  }
);

export default Withdraw;
