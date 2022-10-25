import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { CommentsModel } from "../interface/interface.proposal_comments";
import db from "../../helpers/common/db";
import Proposal from "./model.proposal";
import Users from "./model.users";

interface CommentsInstance extends Model<CommentsModel>, CommentsModel { }

const ProposalComments = db.define<CommentsInstance>(
  "proposal_comments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    proposalId: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.STRING,
    },
    heading: {
      type: DataTypes.STRING,
    },
    comment: {
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

export default ProposalComments;
