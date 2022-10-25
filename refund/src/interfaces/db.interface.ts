import { Sequelize } from "sequelize";

export interface DBInterface {
  db: Sequelize,
  connectionString: string,
}

