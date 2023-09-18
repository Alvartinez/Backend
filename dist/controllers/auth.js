"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getPeopleWithCourses = exports.LoginPersona = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const persona_1 = require("../models/persona");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT_1 = require("../helper/generateJWT");
const user_1 = require("../models/user");
const rol_1 = require("../models/rol");
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
//El usuario inicia sesión
const LoginPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Buscar el usuario por su username
        const user = yield user_1.User.findOne({ where: { username: username },
            include: [
                { model: persona_1.Person, as: "persona" },
                { model: rol_1.Rol, as: "rol" }
            ]
        });
        if (!user) {
            return res.status(400).json({
                msg: "El usuario no existe, verifique el username o contraseña"
            });
        }
        //Valida el password
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: "username o contraseña no valida"
            });
        }
        if (!user.persona.estado) {
            console.log("Estado Desactivado");
            return res.status(400).json({
                msg: user.persona.nombre + " no se encuentra activo, comuníquese con el ADMIN"
            });
        }
        const id = user.persona.id_persona;
        const rol = user.rol.cargo;
        // Se genera el token
        const token = yield (0, generateJWT_1.generateJWT)(id, username, rol);
        // Redirigir según los roles
        if (rol === "Aprendiz") {
            return res.status(200).json({
                msg: "Login exitoso",
                token: token,
                redirectTo: "user-home"
            });
        }
        else if (rol === "Docente") {
            return res.status(200).json({
                msg: "Login exitoso",
                token: token,
                redirectTo: "doc-home"
            });
        }
        else if (rol === "Admin") {
            return res.status(200).json({
                msg: "Login exitoso",
                token: token,
                redirectTo: "admin-home"
            });
        }
        else if (rol === "Visitante") {
            return res.status(200).json({
                msg: "Login exitoso",
                token: token,
                redirectTo: "vist-home"
            });
        }
        // Si no se encuentra un rol válido para redirección, mostrar un mensaje de error
        return res.status(400).json({
            msg: "Usuario sin rol válido para redirección"
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(400).json({
            msg: "¡Ha ocurrido un error!",
        });
    }
});
exports.LoginPersona = LoginPersona;
const getPeopleWithCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listPeopleWithCourses = yield connection_1.default.query(`
    SELECT
    p.id_persona,
    p.nombre,
    p.email,
    p.estado,
    p.fecha_registro,
    JSON_AGG(
      json_build_object(
        'id_curso', c.id_curso,
        'nombre_curso', c.nombre,
        'fecha_inscripcion', i.fecha_inscripcion
      )
    ) as cursos
    FROM
      persona p
    INNER JOIN
      inscrito i ON p.id_persona = i.id_persona
    INNER JOIN
      curso c ON i.id_curso = c.id_curso
    GROUP BY
      p.id_persona;
    `, { type: sequelize_1.QueryTypes.SELECT });
        res.json({ listPeopleWithCourses });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(400).json({
            msg: "¡Ha ocurrido un error!",
        });
    }
});
exports.getPeopleWithCourses = getPeopleWithCourses;
//Cambiar la contraseña
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    const { password, newPassword } = req.body;
    try {
        if (!token) {
            return res.status(400).json({ message: 'Token missing' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.PASSWORD_KEY || "Magic Secret");
        const user = yield user_1.User.findOne({ where: { id_persona: decoded.id } });
        if (!user) {
            return res.status(400).json({
                msg: "Usuario no encontrado"
            });
        }
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: "Las contraseñas no coinciden, verifica"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        yield user_1.User.update({ password: hashedPassword }, { where: { id_persona: user.id_persona } });
        const newToken = (0, generateJWT_1.generateJWT)(decoded.id, user.username, decoded.rol);
        return res.status(200).json({
            msg: "Contraseña actualizada",
            newToken
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: '¡Ha ocurrido un error!'
        });
    }
});
exports.changePassword = changePassword;
/* export const forgetPassword = async (req: Request, res: Response) => {

    const { identifier } = req.body;

    if (!identifier) {
        return res.status(400).json({
            msg: "Debe proporcionar un email o username"
        });
    }

    try {
        const person: any = await Person.findOne({
            where: {
                [Op.or]:[
                    { email: identifier },
                    { username: identifier }
                ]
            }
        });

        if (!person) {
            return res.status(401).json({
                msg: "Usuario no encontrado, verifica el email o username"
            });
        }

        const id = person.id_persona;

        const rol = await getRoles(id);

        const token = jwt.sign(
            { id: id, rol: rol },
            process.env.PASSWORD_KEY || "Magic Secret",
            {
                expiresIn: "1h"
            }
        );

        return res.json(token);

    } catch (error) {
        return res.status(401).json({
            msg: '¡Ha ocurrido un error!'
        });
    }
} */ 
