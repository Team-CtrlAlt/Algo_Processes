import { DataTypes, Model, Optional,UUIDV4 } from "sequelize";

import { DepositModel } from "../interface/interface.deposits";
import db from "../../helpers/common/db";

interface DepositCreationModel extends Optional<DepositModel, "id"> {}
interface DepositInstance extends Model<DepositModel, DepositCreationModel>, DepositModel {}

const Deposit = db.define<DepositInstance>(
  "trnx_deposits",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    from_adrs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    to_adrs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tx_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("complete", "unconfirmed", "confirmed", "failed"),
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
    block_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    block_hash: {
      type: DataTypes.STRING,
      allowNull: true,
    }
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

export default Deposit;
