import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Evaluation = sequelize.define("evaluacion", {
    id_evaluacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    valor_min: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    valor_max: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    indicacion: {
        type: DataTypes.STRING
    }

},{
    tableName: 'evaluacion',
    timestamps: false
});