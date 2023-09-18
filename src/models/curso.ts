import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Person } from "./persona";

export const Course = sequelize.define("curso", {
    id_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    descripcion: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    }, 
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "persona",
            key: "id_persona"
        }
    },
    objetivos: {
        type: DataTypes.JSON,
        allowNull:false
    },
    video_presentacion:{
        type: DataTypes.STRING,
        allowNull:false
    },
    portada:{
        type: DataTypes.STRING,
        allowNull:false
    }

},{
    tableName: 'curso',
    timestamps: false
});

Person.hasMany(Course, { foreignKey: "id_persona", as: "curso" });
Course.belongsTo(Person, { foreignKey: "id_persona", as: "persona" });