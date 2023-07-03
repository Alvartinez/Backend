import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Person = sequelize.define("persona", {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: "usuario",
            key: "id_usuario"
        }
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull:false
    }
    
});