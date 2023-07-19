import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Person = sequelize.define("rol-permiso", {
    id_rol_permiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_rol: {
        type: DataTypes.INTEGER,
        references: {
            model: "rol",
            key: "id_rol"
        }
    },
    lista_permiso: {
        type: DataTypes.JSON,
        unique: true,
        allowNull:false
    }
    
});