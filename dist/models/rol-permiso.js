"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.Person = connection_1.default.define("persona", {
    id_rol_permiso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "rol",
            key: "id_rol"
        }
    },
    lista_permiso: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});
