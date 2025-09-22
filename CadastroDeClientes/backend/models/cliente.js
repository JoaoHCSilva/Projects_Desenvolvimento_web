import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Genero from "./genero.js";

const Cliente = sequelize.define(
  "cadastro_clientes",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    primeiro_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundo_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false, // se não tiver colunas createdAt/updatedAt
  }
);

Cliente.belongsTo(Genero, {
  constraints: true,
  foreignKey: "id_genero",
});

export default Cliente;
