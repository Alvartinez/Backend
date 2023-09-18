"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchEvaluation = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const empareja_1 = require("./empareja");
const quiz_formativo_1 = require("./quiz_formativo");
exports.MatchEvaluation = connection_1.default.define("evaluacion_empareja", {
    id_evaluacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: "evaluacion",
            key: "id_evaluacion"
        }
    },
    id_empareja: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: "empareja",
            key: "id_empareja"
        }
    }
}, {
    tableName: 'evaluacion_empareja',
    timestamps: false
});
quiz_formativo_1.Quiz.hasMany(exports.MatchEvaluation, { foreignKey: "id_evaluacion", as: "evaluacion_empareja" });
exports.MatchEvaluation.belongsTo(quiz_formativo_1.Quiz, { foreignKey: "id_evaluacion", as: "evaluacion" });
empareja_1.Match.hasMany(exports.MatchEvaluation, { foreignKey: "id_empareja", as: "evaluacion_empareja" });
exports.MatchEvaluation.belongsTo(empareja_1.Match, { foreignKey: "id_empareja", as: "empareja" });
