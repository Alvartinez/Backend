"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseEvaluation = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const evaluacion_1 = require("./evaluacion");
const persona_1 = require("./persona");
exports.ResponseEvaluation = connection_1.default.define("respuesta_evaluacion", {
    id_respuesta_evaluacion: {
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
    id_evaluacion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "evaluacion",
            key: "id_evaluacion"
        }
    },
    respuestas: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'respuesta_evaluacion',
    timestamps: false
});
persona_1.Person.hasMany(exports.ResponseEvaluation, { foreignKey: "id_persona", as: "respuesta_evaluacion" });
exports.ResponseEvaluation.belongsTo(persona_1.Person, { foreignKey: "id_persona", as: "persona" });
evaluacion_1.Evaluation.hasMany(exports.ResponseEvaluation, { foreignKey: "id_evaluacion", as: "respuesta_evaluacion" });
exports.ResponseEvaluation.belongsTo(evaluacion_1.Evaluation, { foreignKey: "id_evaluacion", as: "evaluacion" });
