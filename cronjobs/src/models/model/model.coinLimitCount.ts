import { DataTypes, Model, Optional } from "sequelize";

import { CoinLimitCountModel } from "../interface/interface.coinLimitCount";
import db from "../../helpers/common/db";

interface CoinLimitCountCreationModel extends Optional<CoinLimitCountModel, "id"> { }
interface CoinLimitCountInstance extends Model<CoinLimitCountModel, CoinLimitCountCreationModel>, CoinLimitCountModel { }

let CoinLimitCount =  db.define<CoinLimitCountInstance>(
    "coin_limit_counts",
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    counter: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "0 -- usd price, 1 -- graph data"
    }
});


export default CoinLimitCount