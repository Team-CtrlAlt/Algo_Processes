import { DataTypes, Model, Optional } from "sequelize";

import { CurrencyFiatModel } from "../interface/interface.currencyFiat";
import db from "../../helpers/common/db";

interface CurrencyFiatCreationModel extends Optional<CurrencyFiatModel, "currency_id"> { }
interface CurrencyFiatInstance extends Model<CurrencyFiatModel, CurrencyFiatCreationModel>, CurrencyFiatModel { }

const CoinFiatModel = db.define<CurrencyFiatInstance>(
    "currency_fiats",
    {
    currency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    currency_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currency_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currency_symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uuid: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// let dataObjIndex = {
//     indexes: [
//         {
//             unique: true,
//             fields: ['currency_id']
//         },
//         {
//             unique: false,
//             fields: ['currency_code']
//         }
//     ]
// };


export default CoinFiatModel