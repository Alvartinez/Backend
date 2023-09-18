import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Quiz } from "./quiz_formativo";
import { Person } from "./persona";

export const ResponseQuiz = sequelize.define("respuesta_quiz", {
    id_respuesta_quiz: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_persona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    id_quiz_formativo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "quiz_formativo",
            key: "id_quiz_formativo"
        }
    },
    respuestas: {
        type: DataTypes.JSON,
        allowNull:false
    }

},{
    tableName: 'respuesta_quiz',
    timestamps: false
});

Person.hasMany(ResponseQuiz, { foreignKey: "id_persona", as: "respuesta_quiz" });
ResponseQuiz.belongsTo(Person, { foreignKey: "id_persona", as: "persona" });

Quiz.hasMany(ResponseQuiz, { foreignKey: "id_quiz_formativo", as: "respuesta_quiz" });
ResponseQuiz.belongsTo(Quiz, { foreignKey: "id_quiz_formativo", as: "quiz_formativo"});