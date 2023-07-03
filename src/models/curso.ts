import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Course = sequelize.define("curso", {
    id_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    descripcion: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    objetivos: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
});