import sequelize from "../db/connection";
import { DataTypes } from "sequelize";
import { Rol } from "./rol";
import { Permiso } from "./permiso";

export const RolPermiso = sequelize.define("rol_permiso", {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "rol",
            key: "id_rol"
        }
    },
    id_permiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "permiso",
            key: "id_permiso"
        }
    }
    
},{
    tableName: 'rol_permiso',
    timestamps: false
});

Permiso.hasMany(RolPermiso, { foreignKey: "id_permiso", as: "rol_permiso" });
RolPermiso.belongsTo(Permiso, { foreignKey: "id_permiso", as: "permiso" });

Rol.hasMany(RolPermiso, { foreignKey: "id_rol", as: "rol_permiso" });
RolPermiso.belongsTo(Rol, { foreignKey: "id_rol", as: "rol" });