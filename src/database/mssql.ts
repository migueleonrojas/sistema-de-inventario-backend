import config from "../config/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  config.jsonConfig.sql.database,
  config.jsonConfig.sql.user,
  config.jsonConfig.sql.password,
  {
    host: config.jsonConfig.sql.server,
    dialect: 'mssql',
    logging: console.log,
    define: {
      timestamps: false
    }
  }
);


export default {
  sequelize
}