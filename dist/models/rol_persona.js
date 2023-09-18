"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolPersona = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const persona_1 = require("./persona");
const rol_1 = require("./rol");
exports.RolPersona = connection_1.default.define("user", {
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "rol",
            key: "id_rol"
        }
    },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "persona",
            key: "id_persona"
        }
    }
}, {
    tableName: 'rol_persona',
    timestamps: false
});
persona_1.Person.belongsToMany(rol_1.Rol, { through: exports.RolPersona, foreignKey: 'id_persona' });
