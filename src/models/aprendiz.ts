import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

export const Aprendiz = sequelize.define("aprendiz", {
    id_aprendiz: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_persona: {
        type: DataTypes.INTEGER,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull:false
    }
    
},{
    tableName: 'aprendiz',
    timestamps: false
});