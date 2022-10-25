import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { BankDetailModel } from "../interface/interface.bankDetail";
import db from "../../helpers/common/db";

interface BankDetailInstance extends Model<BankDetailModel>, BankDetailModel {}

const BankDetails = db.define<BankDetailInstance>("bankdetails", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  bank_name: {
    type: DataTypes.STRING,
  },
  acc_no: {
    type: DataTypes.STRING,
  },
  ifsc_code: {
    type: DataTypes.STRING,
  },
  branch_name: {
    type: DataTypes.STRING,
  },
  payment_method: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.STRING,
  },
  primary_account: {
    type: DataTypes.BOOLEAN,
  },
});

export default BankDetails;
