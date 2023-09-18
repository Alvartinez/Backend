import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Match } from "./empareja";
import { Quiz } from "./quiz_formativo";

export const MatchEvaluation = sequelize.define("evaluacion_empareja", {
    id_evaluacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: "evaluacion",
            key: "id_evaluacion"
        }
    },
    id_empareja: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: "empareja",
            key: "id_empareja"
        }
    }

},{
    tableName: 'evaluacion_empareja',
    timestamps: false
});

Quiz.hasMany(MatchEvaluation, { foreignKey: "id_evaluacion", as: "evaluacion_empareja" });
MatchEvaluation.belongsTo(Quiz, { foreignKey: "id_evaluacion", as: "evaluacion" } );

Match.hasMany(MatchEvaluation, { foreignKey: "id_empareja", as: "evaluacion_empareja" });
MatchEvaluation.belongsTo(Match, { foreignKey: "id_empareja", as: "empareja" });

