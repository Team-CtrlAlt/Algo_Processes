import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { PhoneModel } from "../interface/interface.phone";
import db from "../../helpers/common/db";

interface PhoneInstance extends Model<PhoneModel>, PhoneModel {}

const Phone = db.define<PhoneInstance>("Phones", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  country_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  otp_verified: {
    type: DataTypes.ENUM,
    values: ["pending", "verified"],
    defaultValue: "pending",
  },
});

export default Phone;
