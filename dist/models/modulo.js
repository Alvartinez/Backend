"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modulo = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.Modulo = connection_1.default.define("modulo", {
    id_modulo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    objetivo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    conclusion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    portada: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    creadores: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    competencias: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    duracion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    temas: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'modulo',
    timestamps: false
});
