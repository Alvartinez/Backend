import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Quiz } from "./quiz_formativo";
import { Select } from "./seleccion";

export const SelectEvaluation = sequelize.define("evaluacion_seleccion", {
    id_evaluacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: "evaluacion",
            key: "id_evaluacion"
        }
    },
    id_seleccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: "seleccion",
            key: "id_seleccion"
        }
    }

},{
    tableName: 'evaluacion_seleccion',
    timestamps: false
});

Quiz.hasMany(SelectEvaluation, { foreignKey: "id_evaluacion", as: "evaluacion_seleccion" });
SelectEvaluation.belongsTo(Quiz, { foreignKey: "id_evaluacion", as: "evaluacion" } );

Select.hasMany(SelectEvaluation, { foreignKey: "id_seleccion", as: "evaluacion_seleccion" });
SelectEvaluation.belongsTo(Select, { foreignKey: "id_seleccion", as: "seleccion" });