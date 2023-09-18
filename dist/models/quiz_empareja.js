"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizMatch = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const empareja_1 = require("./empareja");
const quiz_formativo_1 = require("./quiz_formativo");
exports.QuizMatch = connection_1.default.define("quiz_empareja", {
    id_quiz_formativo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "quiz_formativo",
            key: "id_quiz_formativo"
        }
    },
    id_empareja: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "empareja",
            key: "id_empareja"
        }
    }
}, {
    tableName: 'quiz_empareja',
    timestamps: false
});
empareja_1.Match.hasMany(exports.QuizMatch, { foreignKey: "id_empareja", as: "quiz_empareja" });
exports.QuizMatch.belongsTo(empareja_1.Match, { foreignKey: "id_empareja", as: "empareja" });
quiz_formativo_1.Quiz.hasMany(exports.QuizMatch, { foreignKey: "id_quiz_formativo", as: "quiz_empareja" });
exports.QuizMatch.belongsTo(quiz_formativo_1.Quiz, { foreignKey: "id_quiz_formativo", as: "quiz_formativo" });
