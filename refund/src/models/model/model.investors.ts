import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { InvestorsModel } from "../interface/interface.investors";
import db from "../../helpers/common/db";

interface InvestorsInstance extends Model<InvestorsModel>, InvestorsModel {}

const Investors = db.define<InvestorsInstance>(
  "investors",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId:{
      type: DataTypes.STRING,
    },
    proposalId: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.STRING,
    }
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

export default Investors;
