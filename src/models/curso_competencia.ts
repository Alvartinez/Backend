import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Course } from "./curso";
import { Skill } from "./competencia";

export const CourseSkill = sequelize.define("curso_competencia", {
    id_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "curso",
            key: "id_curso"
        }
    },
    id_competencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "competencia",
            key: "id_competencia"
        }
    }
    
},{
    tableName: 'curso_competencia',
    timestamps: false
});

Course.hasMany(CourseSkill, { foreignKey: "id_curso", as: "curso_competencia" });
CourseSkill.belongsTo(Course, { foreignKey: "id_curso", as: "curso" });

Skill.hasMany(CourseSkill, { foreignKey: "id_competencia", as: "curso_competencia" });
CourseSkill.belongsTo(Skill, { foreignKey: "id_competencia", as: "competencia" });