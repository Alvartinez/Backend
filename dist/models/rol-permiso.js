"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolPermiso = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const rol_1 = require("./rol");
const permiso_1 = require("./permiso");
exports.RolPermiso = connection_1.default.define("rol_permiso", {
    id_rol: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "rol",
            key: "id_rol"
        }
    },
    id_permiso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "permiso",
            key: "id_permiso"
        }
    }
}, {
    tableName: 'rol_permiso',
    timestamps: false
});
permiso_1.Permiso.hasMany(exports.RolPermiso, { foreignKey: "id_permiso", as: "rol_permiso" });
exports.RolPermiso.belongsTo(permiso_1.Permiso, { foreignKey: "id_permiso", as: "permiso" });
rol_1.Rol.hasMany(exports.RolPermiso, { foreignKey: "id_rol", as: "rol_permiso" });
exports.RolPermiso.belongsTo(rol_1.Rol, { foreignKey: "id_rol", as: "rol" });
