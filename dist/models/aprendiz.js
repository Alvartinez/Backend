"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aprendiz = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.Aprendiz = connection_1.default.define("aprendiz", {
    id_aprendiz: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'aprendiz',
    timestamps: false
});
