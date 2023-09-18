"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectEvaluation = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const quiz_formativo_1 = require("./quiz_formativo");
const seleccion_1 = require("./seleccion");
exports.SelectEvaluation = connection_1.default.define("evaluacion_seleccion", {
    id_evaluacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: "evaluacion",
            key: "id_evaluacion"
        }
    },
    id_seleccion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: "seleccion",
            key: "id_seleccion"
        }
    }
}, {
    tableName: 'evaluacion_seleccion',
    timestamps: false
});
quiz_formativo_1.Quiz.hasMany(exports.SelectEvaluation, { foreignKey: "id_evaluacion", as: "evaluacion_seleccion" });
exports.SelectEvaluation.belongsTo(quiz_formativo_1.Quiz, { foreignKey: "id_evaluacion", as: "evaluacion" });
seleccion_1.Select.hasMany(exports.SelectEvaluation, { foreignKey: "id_seleccion", as: "evaluacion_seleccion" });
exports.SelectEvaluation.belongsTo(seleccion_1.Select, { foreignKey: "id_seleccion", as: "seleccion" });
