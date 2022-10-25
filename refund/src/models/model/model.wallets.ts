import { DataTypes, Model, Optional } from "sequelize";

import { WalletModel } from "../interface/interface.wallets";
import CoinModel from "../model/model.coins";
import db from "../../helpers/common/db";

interface WalletCreationModel extends Optional<WalletModel, "id"> {}
interface WalletInstance extends Model<WalletModel, WalletCreationModel>, WalletModel {}

const Wallet = db.define<WalletInstance>('wallets', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wallet_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wallet_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    balance: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    default_wallet: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    
   
  
    // balance_blocked: {
    //     type: DataTypes.DOUBLE,
    //     allowNull: true
    // },
    // user_withdraw_limit: {
    //     type: DataTypes.FLOAT,
    //     allowNull: true
    // },
  
    // status: {
    //     type: DataTypes.TINYINT,
    //     allowNull: true
    // },
    // is_deleted: {
    //     type: DataTypes.TINYINT,
    //     allowNull: true
    // },
    // sort_order: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true
    // },
    // is_private_wallet: {
    //     type: DataTypes.TINYINT,
    //     allowNull: true
    // },
},
{
    indexes:[
        {
            unique: false,
            fields:['user_id']
        },
        {
            unique: false,
            fields:['wallet_address']
        },
        {
            unique: false,
            fields:['coin_id']
        }
    ]
});

Wallet.belongsTo(CoinModel,{ foreignKey: 'coin_id',targetKey: 'coin_id'});

export default Wallet;