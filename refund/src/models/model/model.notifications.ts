import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";

import { NotificationModel } from "../interface/interface.notifications";
import db from "../../helpers/common/db";

interface NotificationCreationModel extends Optional<NotificationModel, "id"> {}
interface NotificationInstance extends Model<NotificationModel, NotificationCreationModel>, NotificationModel {}

const Notification = db.define<NotificationInstance>("notifications", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  by_user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to_user_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notification_type: {
    type: DataTypes.TINYINT,
    allowNull: true, // 2 for refund notifications
  },
});
// Notification.hasOne(user, {
//   foreignKey: "id",
//   sourceKey: "tx_id",
// });

export default Notification;
