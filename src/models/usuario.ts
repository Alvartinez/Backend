import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const User = sequelize.define("usuario", {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_rol_permiso: {
        type: DataTypes.INTEGER,
        references: {
            model: "rol-permiso",
            key: "id_rol_permiso"
        }
    }
    
});