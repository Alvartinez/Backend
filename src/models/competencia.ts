import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Skill = sequelize.define("competencia", {
    id_competencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    competencia: {
        type: DataTypes.JSON,
        allowNull:false
    }

},{
    tableName: 'competencia',
    timestamps: false
});