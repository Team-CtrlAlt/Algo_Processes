require("dotenv").config();
import { DBInterface } from "../../interfaces/db.interface";
import { Sequelize } from "sequelize";
import { config } from "../../config/config"
class Database implements DBInterface {

  public db: Sequelize;
  public connectionString: string;
  constructor() {
    this.connectionString = `mysql://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_DATABASE}`;
    this.db = new Sequelize(this.connectionString, {
      dialect: "mysql",
      logging: false,
      define: {
        charset: "utf8",
        collate: "utf8_general_ci",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamps: true,
      },
      pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000,
      },
    });
    // this.syncTables();
  }

  public async syncTables() {
    await this.db.sync({ alter: true });
  }
  
}
const db = new Database().db;
export default db;
