import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE, //database
  process.env.USER, // user
  process.env.PASSWORD, //senha
  {
    host: process.env.HOST, //host
    dialect: "mysql", //tipo de banco que vai ser utilizado
  }
);

export default sequelize;
