"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const modulo_1 = require("./modulo");
exports.Quiz = connection_1.default.define("quiz_formativo", {
    id_quiz_formativo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    indicacion: {
        type: sequelize_1.DataTypes.STRING
    },
    valor_min: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    valor_max: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_modulo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "modulo",
            key: "id_modulo"
        }
    }
}, {
    tableName: 'quiz_formativo',
    timestamps: false
});
modulo_1.Modulo.hasMany(exports.Quiz, { foreignKey: "id_modulo", as: "quiz_formativo" });
exports.Quiz.belongsTo(modulo_1.Modulo, { foreignKey: "id_modulo", as: "modulo" });
