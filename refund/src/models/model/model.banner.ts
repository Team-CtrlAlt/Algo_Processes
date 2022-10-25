import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { BannerModel } from "../interface/interface.banner";
import db from "../../helpers/common/db";

interface BannerInstance extends Model<BannerModel>, BannerModel {}

const Banner = db.define<BannerInstance>("banners", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  banner_img: {
    type: DataTypes.STRING,
  },
});

export default Banner;
