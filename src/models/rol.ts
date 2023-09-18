import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Rol = sequelize.define("rol", {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cargo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    }
    
},{
    tableName: 'rol',
    timestamps: false
});
