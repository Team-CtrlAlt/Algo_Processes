import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { CategoryModel } from "../interface/interface.category";
import db from "../../helpers/common/db";


interface CatInstance extends Model<CategoryModel>, CategoryModel { }

const Category = db.define<CatInstance>(
  "categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
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


export default Category;
