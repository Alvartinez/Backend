import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const User = sequelize.define("rol", {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    }
    
});