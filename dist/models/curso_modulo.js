"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const curso_1 = require("./curso");
const modulo_1 = require("./modulo");
exports.CourseModule = connection_1.default.define("curso_modulo", {
    id_curso: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "curso",
            key: "id_curso"
        }
    },
    id_modulo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "modulo",
            key: "id_modulo"
        }
    }
}, {
    tableName: 'curso_modulo',
    timestamps: false
});
curso_1.Course.hasMany(exports.CourseModule, { foreignKey: "id_curso", as: "curso_modulo" });
exports.CourseModule.belongsTo(curso_1.Course, { foreignKey: "id_curso", as: "curso" });
modulo_1.Modulo.hasMany(exports.CourseModule, { foreignKey: "id_modulo", as: "curso_modulo" });
exports.CourseModule.belongsTo(modulo_1.Modulo, { foreignKey: "id_modulo", as: "modulo" });
