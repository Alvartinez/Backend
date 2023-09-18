import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Match = sequelize.define("empareja", {
    id_empareja: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    enunciado: {
        type: DataTypes.STRING,
        allowNull:false
    },
    pareja:{
        type: DataTypes.JSON,
        allowNull: false
    },
    puntaje:{
        type: DataTypes.NUMBER,
        allowNull: false
    }

},{
    tableName: 'empareja',
    timestamps: false
});