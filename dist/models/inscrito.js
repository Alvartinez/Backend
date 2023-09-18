"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inscrito = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const persona_1 = require("./persona");
const curso_1 = require("./curso");
exports.Inscrito = connection_1.default.define("inscrito", {
    id_curso: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "curso",
            key: "id_curso"
        }
    },
    fecha_inscripcion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    id_inscrito: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'inscrito',
    timestamps: false
});
persona_1.Person.hasMany(exports.Inscrito, { foreignKey: "id_persona", as: "inscrito" });
exports.Inscrito.belongsTo(persona_1.Person, { foreignKey: "id_persona", as: "persona" });
curso_1.Course.hasMany(exports.Inscrito, { foreignKey: "id_curso", as: "inscrito" });
exports.Inscrito.belongsTo(curso_1.Course, { foreignKey: "id_curso", as: "curso" });
