import { DBInterface } from "../interfaces/db.interface";
import { Sequelize } from "sequelize";
import 'dotenv/config'
class Database implements DBInterface {
  public db: Sequelize;
  public connectionString: string;

  constructor() {
    this.connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
    this.db = new Sequelize(this.connectionString, {
      dialect: "mysql",
      logging: false,
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        underscored: true,
        timestamps: true
      },
      pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
      }
    });
    // this.syncTables();
  }

  public async syncTables() {
    // await this.db.sync({ alter: true });
  }
}
// const db = new Database().db
// export default db;

const database = new Database();
export default database;
