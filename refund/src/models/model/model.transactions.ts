import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { TransactionModel } from "../interface/interface.transactions";
import db from "../../helpers/common/db";
import { proposal, refundStatus } from "../../helpers/constant";
import Proposal from "./model.proposal";
import Users from "./model.users";
interface TransactionCreationModel extends Optional<TransactionModel, "id"> {}
interface TransactionInstance extends Model<TransactionModel, TransactionCreationModel>, TransactionModel {}

const Transactions = db.define<TransactionInstance>(
  "transactions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    project_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proposal_id: {
      type: DataTypes.STRING,
    },
    participant_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token_quantity: {
      type: DataTypes.STRING,
    },
    responseData: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("responseData");
        return rawValue ? JSON.parse(rawValue) : null;
      },
    },
    payment_status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    refund_status: {
      type: DataTypes.TINYINT,
      defaultValue: refundStatus.hold,
    },
  },
  {
    hooks: {
      beforeValidate: function () {},
      afterValidate: function () {},
      afterCreate: function () {},
      beforeCreate: function () {},
    },
  }
);

Transactions.belongsTo(Proposal, {
  foreignKey: "proposal_id",
  targetKey: "id",
});
Proposal.hasMany(Transactions, {
  foreignKey: "proposal_id",
  sourceKey: "id",
});
export default Transactions;
