import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";

const conexao = await mysql
  .createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
  })
  .then(() => {
    console.log("Conexao realizada com sucesso");
  })
  .catch((erro) => {
    console.log(`%cErro ao realizar conexao ${erro}`, "color: red");
  });

export default conexao;
