"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseQuiz = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const quiz_formativo_1 = require("./quiz_formativo");
const persona_1 = require("./persona");
exports.ResponseQuiz = connection_1.default.define("respuesta_quiz", {
    id_respuesta_quiz: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    id_quiz_formativo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "quiz_formativo",
            key: "id_quiz_formativo"
        }
    },
    respuestas: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'respuesta_quiz',
    timestamps: false
});
persona_1.Person.hasMany(exports.ResponseQuiz, { foreignKey: "id_persona", as: "respuesta_quiz" });
exports.ResponseQuiz.belongsTo(persona_1.Person, { foreignKey: "id_persona", as: "persona" });
quiz_formativo_1.Quiz.hasMany(exports.ResponseQuiz, { foreignKey: "id_quiz_formativo", as: "respuesta_quiz" });
exports.ResponseQuiz.belongsTo(quiz_formativo_1.Quiz, { foreignKey: "id_quiz_formativo", as: "quiz_formativo" });
