"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.Match = connection_1.default.define("empareja", {
    id_empareja: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    enunciado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pareja: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    puntaje: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    }
}, {
    tableName: 'empareja',
    timestamps: false
});
