"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.User = connection_1.default.define("persona", {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    id_rol_permiso: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "rol-permiso",
            key: "id_rol_permiso"
        }
    }
});
