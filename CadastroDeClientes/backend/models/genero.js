import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Genero = sequelize.define("genero", {
  id_genero: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  genero: {
    type: DataTypes.STRING,
  },
});

export default Genero;
