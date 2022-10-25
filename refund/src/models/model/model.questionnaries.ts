import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { QuestionModel } from "../interface/interface.questionnaries";
import db from "../../helpers/common/db";
import Answernaries from "./model.answernaries";

interface QuestionInstance extends Model<QuestionModel>, QuestionModel {}

const Questionnaries = db.define<QuestionInstance>(
  "questionnaries",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue("question");
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    answerJson: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("answerJson");
        return rawValue ? JSON.parse(rawValue) : null;
      },
    },
    sequence: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
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

// Questionnaries.hasMany(Answernaries, {
//   foreignKey: "questionId",
// });

export default Questionnaries;
