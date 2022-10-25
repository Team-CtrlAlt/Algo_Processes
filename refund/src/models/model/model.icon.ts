import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { IconModel } from "../interface/interface.icon";
import db from "../../helpers/common/db";
interface IconInstance extends Model<IconModel>, IconModel {}

const Icons = db.define<IconInstance>(
  "icons",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    iconName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
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

export default Icons;
