import { Sequelize } from "sequelize/types";

export interface DBInterface {
  db: Sequelize;
  connectionString: string;
}
