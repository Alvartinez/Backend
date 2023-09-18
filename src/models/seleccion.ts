import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Select = sequelize.define("seleccion", {
    id_seleccion: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    enunciado: {
        type: DataTypes.STRING,
        allowNull:false
    },
    multiple:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    seleccion:{
        type: DataTypes.JSON,
        allowNull: false
    },
    puntaje:{
        type: DataTypes.NUMBER,
        allowNull: false
    }

},{
    tableName: 'seleccion',
    timestamps: false
});