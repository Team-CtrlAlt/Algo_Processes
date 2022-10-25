import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { IconsModel } from "../interface/interface.icons";
import db from "../../helpers/common/db";

interface IconsInstance extends Model<IconsModel>, IconsModel {}

const Icons = db.define<IconsInstance>(
  "icons",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    icon_link: {
      type: DataTypes.STRING,
    }
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
