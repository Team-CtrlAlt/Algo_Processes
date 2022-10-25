import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { ProposalModel } from "../interface/interface.proposal";
import db from "../../helpers/common/db";
import Asset from "./model.asset";
import FavouriteProposals from "./model.favouriteProposals";
import ProposalComments from "./model.proposal_comments";
import Transactions from "./model.transactions";
import { mintStatus } from "../../helpers/constant";

interface ProposalInstance extends Model<ProposalModel>, ProposalModel {}

const Proposal = db.define<ProposalInstance>(
  "proposals",
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
    title: {
      type: DataTypes.STRING,
    },
    head: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    additionalFeature: {
      type: DataTypes.TEXT,
    },
    documents: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("documents");
        return rawValue ? JSON.parse(rawValue as string) : null;
      },
    },
    banner_image: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("banner_image");
        return rawValue ? JSON.parse(rawValue as string) : null;
      },
    },
    feature: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("feature");
        return rawValue ? JSON.parse(rawValue as string) : null;
      },
    },
    subHead: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("subHead");
        return rawValue ? JSON.parse(rawValue as string) : null;
      },
    },
    raiseFund: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    assetTypeId: {
      type: DataTypes.STRING,
    },
    project_id: {
      type: DataTypes.STRING,
    },
    minInvestment: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.DATE,
    },
    fee: {
      type: DataTypes.STRING,
    },
    issuedToken: {
      type: DataTypes.STRING,
    },
    tokenToSold: {
      type: DataTypes.STRING,
    },
    mintStatus: {
      type: DataTypes.TINYINT,
      defaultValue: mintStatus.unMinted,
    },

    tokenValue: {
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
Proposal.hasMany(ProposalComments, {
  foreignKey: "proposalId",
  sourceKey: "id",
});

export default Proposal;
