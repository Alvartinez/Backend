import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Person } from "./persona";
import { Course } from "./curso";

export const Inscrito = sequelize.define("inscrito", {
    id_curso: {
        type: DataTypes.INTEGER,
        references: {
            model: "curso",
            key: "id_curso"
        }
    },
    fecha_inscripcion: {
        type: DataTypes.DATE,
        allowNull:false
    },
    id_persona: {
        type: DataTypes.INTEGER,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    id_inscrito:{
        type: DataTypes.INTEGER,
        primaryKey: true
    }
    
},{
    tableName: 'inscrito',
    timestamps: false
});

Person.hasMany(Inscrito, { foreignKey: "id_persona", as: "inscrito" });
Inscrito.belongsTo(Person, { foreignKey: "id_persona", as: "persona"  });

Course.hasMany(Inscrito, { foreignKey: "id_curso", as: "inscrito" });
Inscrito.belongsTo(Course, { foreignKey: "id_curso", as: "curso" });