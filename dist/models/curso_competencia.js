"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSkill = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const curso_1 = require("./curso");
const competencia_1 = require("./competencia");
exports.CourseSkill = connection_1.default.define("curso_competencia", {
    id_curso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "curso",
            key: "id_curso"
        }
    },
    id_competencia: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "competencia",
            key: "id_competencia"
        }
    }
}, {
    tableName: 'curso_competencia',
    timestamps: false
});
curso_1.Course.hasMany(exports.CourseSkill, { foreignKey: "id_curso", as: "curso_competencia" });
exports.CourseSkill.belongsTo(curso_1.Course, { foreignKey: "id_curso", as: "curso" });
competencia_1.Skill.hasMany(exports.CourseSkill, { foreignKey: "id_competencia", as: "curso_competencia" });
exports.CourseSkill.belongsTo(competencia_1.Skill, { foreignKey: "id_competencia", as: "competencia" });
