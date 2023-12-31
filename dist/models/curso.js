"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const persona_1 = require("./persona");
exports.Course = connection_1.default.define("curso", {
    id_curso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    objetivos: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    video_presentacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    portada: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'curso',
    timestamps: false
});
persona_1.Person.hasMany(exports.Course, { foreignKey: "id_persona", as: "curso" });
exports.Course.belongsTo(persona_1.Person, { foreignKey: "id_persona", as: "persona" });
