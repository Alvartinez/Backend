"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizSelection = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const quiz_formativo_1 = require("./quiz_formativo");
const seleccion_1 = require("./seleccion");
exports.QuizSelection = connection_1.default.define("quiz_seleccion", {
    id_quiz_formativo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "quiz_formativo",
            key: "id_quiz_formativo"
        }
    },
    id_seleccion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "seleccion",
            key: "id_seleccion"
        }
    }
}, {
    tableName: 'quiz_seleccion',
    timestamps: false
});
seleccion_1.Select.hasMany(exports.QuizSelection, { foreignKey: "id_seleccion", as: "quiz_seleccion" });
exports.QuizSelection.belongsTo(seleccion_1.Select, { foreignKey: "id_seleccion", as: "seleccion" });
quiz_formativo_1.Quiz.hasMany(exports.QuizSelection, { foreignKey: "id_quiz_formativo", as: "quiz_seleccion" });
exports.QuizSelection.belongsTo(quiz_formativo_1.Quiz, { foreignKey: "id_quiz_formativo", as: "quiz_formativo" });
