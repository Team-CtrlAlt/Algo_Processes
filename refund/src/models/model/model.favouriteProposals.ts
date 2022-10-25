import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { FavouriteModel } from "../interface/interface.favouriteProposals";
import db from "../../helpers/common/db";
import Users from "./model.users";
import Proposal from "./model.proposal";

interface FavouriteInstance extends Model<FavouriteModel>, FavouriteModel {}

const FavouriteProposals = db.define<FavouriteInstance>("favouriteProposals", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
  },

  proposalId: {
    type: DataTypes.STRING,
  },
  favUnfav:{
      type :DataTypes.TINYINT
  }
});

 Proposal.hasMany(FavouriteProposals, {
  foreignKey: "proposalId"
});
export default FavouriteProposals;
