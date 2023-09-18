"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const persona_1 = require("./persona");
const rol_1 = require("./rol");
exports.User = connection_1.default.define("user", {
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "rol",
            key: "id_rol"
        }
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: false
});
persona_1.Person.hasMany(exports.User, { foreignKey: "id_persona", as: "user" });
exports.User.belongsTo(persona_1.Person, { foreignKey: "id_persona", as: "persona" });
rol_1.Rol.hasMany(exports.User, { foreignKey: "id_rol", as: "user" });
exports.User.belongsTo(rol_1.Rol, { foreignKey: "id_rol", as: "rol" });
