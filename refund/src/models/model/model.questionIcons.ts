import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { QuestionIconModel } from "../interface/interface.questionIcons";
import db from "../../helpers/common/db";
interface IconInstance extends Model<QuestionIconModel>, QuestionIconModel {}

const QuestionIcons = db.define<IconInstance>(
  "questionIcons",
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

export default QuestionIcons;
