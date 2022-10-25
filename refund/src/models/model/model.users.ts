import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { UserModel } from "../interface/interface.users";
import db from "../../helpers/common/db";
import Notification from "./model.notifications";
import Proposal from "./model.proposal";
import Wallet from "./model.wallets";
import Phones from "./model.phone"
import UserAnswer from "./model.userAnswers";
import Transactions from "./model.transactions";
import ProposalComments from "./model.proposal_comments"
interface UserCreationModel extends Optional<UserModel, "id"> { }
interface UserInstance extends Model<UserModel ,UserCreationModel>, UserModel {}

const Users = db.define<UserInstance>(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    role: {
      type: DataTypes.TINYINT,
      defaultValue: 0 /* user : 0 && admin : 1 && issuer : 2 */,
    },
    currency_fiat_id:{
      type: DataTypes.TINYINT
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull:true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull:true
    },
    image:{
      type: DataTypes.STRING,
      allowNull:true
    },
    iat:{
      type: DataTypes.INTEGER,
      allowNull:true,
      defaultValue: 0,
    },
    client_secret:{
      type: DataTypes.STRING,
      allowNull:true
    },
    kycStatus:{
      type:DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull:true
    },
    pin: {
      type: DataTypes.STRING,
      allowNull:true
    },
    forgotPasswordHash:{
      type: DataTypes.STRING,
      defaultValue:null,
      allowNull:true
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull:true
    },
    google2fa_secret:{
      type:DataTypes.STRING,
      allowNull:true
    },
    google2fa_status:{
      type:DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    participant_id:{
      type:DataTypes.STRING,
      allowNull:true
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

Users.hasMany(Notification, {
  foreignKey: "by_user_id",
  sourceKey: "id",
});
Users.hasMany(Transactions, {
  foreignKey: "userId",
  sourceKey: "id"
});
Users.hasOne(Phones, {
  foreignKey: "mobile_no",
  sourceKey:"mobile_no"
});

Users.hasMany(Wallet, {
  foreignKey: "user_id",
  sourceKey: "id",
});

Users.hasMany(Proposal, {
  foreignKey: "userId",
  sourceKey: "id",
});
Users.hasMany(UserAnswer, {
  foreignKey: "userId",
  sourceKey: "id",
});
Transactions.belongsTo(Users, {
  foreignKey: "userId"
});
 ProposalComments.belongsTo(Users, {
  foreignKey: "userId",
  targetKey: "id",
});
// Referral.belongsTo(Users, {
//   foreignKey: "referee_id",
//   targetKey: "id",
//   as: "refereeId",
// });
// Referral.belongsTo(Users, {
//   foreignKey: "referrer_id",
//   targetKey: "id",
//   as: "referrerId",
// });
// Rewards.belongsTo(Users, {
//   foreignKey: "user_id",
//   targetKey: "id",
// });

// Withdraw.belongsTo(Users, {
//   foreignKey: "user_id",
// });
// Kyc.belongsTo(Users, {
//   foreignKey: "user_id",
// });
// Users.hasOne(Kyc, {
//   foreignKey: "user_id",
//   sourceKey: "id",
// });
// BuyCoin.belongsTo(Users, {
//   foreignKey: "user_id",
// });
// SellCoin.belongsTo(Users, {
//   foreignKey: "user_id",
// });

// Users.hasMany(BuyCoin, {
//   foreignKey: "user_id",
//   sourceKey: "id",
// });

export default Users;
