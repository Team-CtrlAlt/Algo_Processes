import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { SubscriptionModel } from "../interface/interface.subscription";
import db from "../../helpers/common/db";


interface SubscriptionInstance extends Model<SubscriptionModel>, SubscriptionModel { }

const Asset = db.define<SubscriptionInstance>(
  "subscription",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    subscriptionTitle: {
      type: DataTypes.STRING,
    }
  },
  {
    hooks: {
      beforeValidate: function () { },
      afterValidate: function () { },
      afterCreate: function () { },
      beforeCreate: function () { },
    },
  }
);


export default Asset;
