"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.Select = connection_1.default.define("seleccion", {
    id_seleccion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    enunciado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    multiple: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    seleccion: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    puntaje: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    }
}, {
    tableName: 'seleccion',
    timestamps: false
});
