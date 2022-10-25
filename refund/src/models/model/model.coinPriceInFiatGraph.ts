import { DataTypes, Model, Optional } from "sequelize";

import { CoinPriceInFiatGraphModel } from "../interface/interface.coinPriceInFiatGraph";
import db from "../../helpers/common/db";

interface CoinPriceInFiatCreationModel extends Optional<CoinPriceInFiatGraphModel, "id"> { }
interface CoinPriceInFiatInstance extends Model<CoinPriceInFiatGraphModel, CoinPriceInFiatCreationModel>, CoinPriceInFiatGraphModel { }

const CoinPriceInFiatGraph = db.define<CoinPriceInFiatInstance>(
    "coin_price_in_fiat_graphs",
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    coin_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fiat_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    price_change_24h: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    price_change_percentage_24h: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
});
// let dataObjIndex = {
//     indexes: [
//         {
//             unique: false,
//             fields: ['coin_type']
//         },
//         {
//             unique: false,
//             fields: ['fiat_type']
//         }
//     ]
// };

export default CoinPriceInFiatGraph