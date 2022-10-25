import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { AnswerModel } from "../interface/interface.answernaries";
import db from "../../helpers/common/db";

interface AnswerInstance extends Model<AnswerModel>, AnswerModel {}

const Answernaries = db.define<AnswerInstance>(
  "answernaries",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    questionId: {
      type: DataTypes.STRING,
    },
    skipTo: {
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

export default Answernaries;
