import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Match } from "./empareja";
import { Quiz } from "./quiz_formativo";

export const QuizMatch = sequelize.define("quiz_empareja", {
    id_quiz_formativo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "quiz_formativo",
            key: "id_quiz_formativo"
        }
    },
    id_empareja: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "empareja",
            key: "id_empareja"
        }
    }

    
},{
    tableName: 'quiz_empareja',
    timestamps: false
});

Match.hasMany(QuizMatch, { foreignKey: "id_empareja", as: "quiz_empareja" });
QuizMatch.belongsTo(Match, { foreignKey: "id_empareja", as: "empareja" })

Quiz.hasMany(QuizMatch, { foreignKey: "id_quiz_formativo", as: "quiz_empareja" });
QuizMatch.belongsTo(Quiz, { foreignKey: "id_quiz_formativo", as: "quiz_formativo" });
