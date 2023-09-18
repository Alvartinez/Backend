"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluation = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.Evaluation = connection_1.default.define("evaluacion", {
    id_evaluacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    valor_min: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    valor_max: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    indicacion: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'evaluacion',
    timestamps: false
});
