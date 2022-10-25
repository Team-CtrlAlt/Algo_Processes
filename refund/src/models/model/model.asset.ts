import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { AssetModel } from "../interface/interface.asset";
import db from "../../helpers/common/db";
import Proposal from "../model/model.proposal"
import { proposal } from "../../helpers/constant";

interface AssetInstance extends Model<AssetModel>, AssetModel { }

const Asset = db.define<AssetInstance>(
  "assets",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    assetType: {
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
  Proposal.belongsTo(Asset, {
  foreignKey: "assetTypeId"
});
Asset.hasMany(Proposal, {
  foreignKey: "assetTypeId"
});
export default Asset;
