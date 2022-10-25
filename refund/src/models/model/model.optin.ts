import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { OptinModel } from "../interface/interface.optin";
import db from "../../helpers/common/db";

interface OptinInstance extends Model<OptinModel>, OptinModel {}

const Optin = db.define<OptinInstance>(
  "optins",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    proposal_id: {
      type: DataTypes.STRING,
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

export default Optin;
