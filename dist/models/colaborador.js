"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partner = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const persona_1 = require("./persona");
const curso_1 = require("./curso");
exports.Partner = connection_1.default.define("colaborador", {
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    id_curso: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "curso",
            key: "id_curso"
        }
    }
}, {
    tableName: 'colaborador',
    timestamps: false
});
persona_1.Person.hasMany(exports.Partner, { foreignKey: "id_persona", as: "colaborador" });
exports.Partner.belongsTo(persona_1.Person, { foreignKey: "id_persona", as: "persona" });
curso_1.Course.hasMany(exports.Partner, { foreignKey: "id_curso", as: "colaborador" });
exports.Partner.belongsTo(curso_1.Course, { foreignKey: "id_curso", as: "curso" });
