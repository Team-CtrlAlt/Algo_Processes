import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { UserAnswerModel } from "../interface/interface.userAnswer";
import db from "../../helpers/common/db";

interface AnswersCreationModel extends Optional<UserAnswerModel, "id"> { }
interface UserAnswerInstance extends Model<UserAnswerModel ,AnswersCreationModel>, UserAnswerModel {}

const UserAnswer = db.define<UserAnswerInstance>(
  "userAnswers",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING
    },
    jsonData:{
      type: DataTypes.STRING
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


export default UserAnswer;
