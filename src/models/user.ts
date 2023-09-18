import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Person } from "./persona";
import { Rol } from "./rol";

export const User = sequelize.define("user", {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "persona",
            key: "id_persona"
        }
    }, 
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull : false,
        references: {
            model: "rol",
            key: "id_rol"
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull : false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }

},{
    tableName: 'user',
    timestamps: false
});

Person.hasMany(User, { foreignKey: "id_persona", as: "user" });
User.belongsTo(Person, { foreignKey: "id_persona", as: "persona" });

Rol.hasMany(User, { foreignKey: "id_rol", as: "user" });
User.belongsTo(Rol, { foreignKey: "id_rol", as: "rol" });
