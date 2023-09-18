import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Person } from "./persona";
import { Course } from "./curso";

export const Partner = sequelize.define("colaborador", {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    id_curso: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: "curso",
            key: "id_curso"
        }
    }

},{
    tableName: 'colaborador',
    timestamps: false
});

Person.hasMany(Partner, { foreignKey: "id_persona", as: "colaborador" });
Partner.belongsTo(Person, { foreignKey: "id_persona", as: "persona" });

Course.hasMany(Partner, { foreignKey: "id_curso", as: "colaborador" });
Partner.belongsTo(Course, { foreignKey: "id_curso", as: "curso" });