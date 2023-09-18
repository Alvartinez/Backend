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
exports.enabledPersona = exports.deletePersona = exports.disabledPersona = exports.newPersona = exports.getPerson = exports.getPeople = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const persona_1 = require("../models/persona");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const randomUsername_1 = require("../helper/randomUsername");
const user_1 = require("../models/user");
const sendEmail_1 = require("../helper/sendEmail");
const rol_1 = require("../models/rol");
//Trae una lista de usuarios
const getPeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listPerson = yield persona_1.Person.findAll({
            include: [
                {
                    model: user_1.User,
                    as: 'user',
                    include: [
                        { model: rol_1.Rol, as: 'rol' }
                    ]
                }
            ]
        });
        if (!listPerson) {
            res.status(400).json({
                msg: "Se ha ocurrido, consulta al Admin"
            });
        }
        res.json({ listPerson });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            msg: 'Se ha ocurrido un error'
        });
    }
});
exports.getPeople = getPeople;
//Trae a un usuario en específico 
const getPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const secretKey = process.env.PASSWORD_KEY || "Magic Secret";
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        const userId = decodedToken.id;
        const user = yield persona_1.Person.findOne({ where: { id_persona: userId } });
        if (user) {
            const userInfo = {
                nombre: user.nombre,
                username: user.username,
                email: user.email,
                fecha_registro: user.fecha_registro,
                rol: decodedToken.rol
            };
            res.json(userInfo);
        }
        else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Se ha ocurrido un error' });
    }
});
exports.getPerson = getPerson;
//Crear un nuevo usuario
const newPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password } = req.body;
    //Validar si existe el usuario
    const user = yield persona_1.Person.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: "Ya existe el usuario " + nombre + "."
        });
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const dateStr = `${year}-${month}-${day}`;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    let username = (0, randomUsername_1.generateRandomUsername)(nombre);
    let isUsernameTaken = yield user_1.User.findOne({ where: { username: username } });
    while (isUsernameTaken) {
        username = (0, randomUsername_1.generateRandomUsername)(nombre);
        isUsernameTaken = yield user_1.User.findOne({ where: { username: username } });
    }
    try {
        //Creación del usuario
        const persona = yield persona_1.Person.create({
            nombre: nombre,
            email: email,
            estado: true,
            fecha_registro: dateStr
        });
        const id = yield persona_1.Person.findOne({ where: { email: email } });
        const rolPerson = yield user_1.User.create({
            id_persona: id.id_persona,
            id_rol: 1,
            username: username,
            password: hashedPassword
        });
        //Información para usar en el email
        const infoEmail = {
            nombre,
            username,
            email,
            password
        };
        yield (0, sendEmail_1.enviarMensajeInsideServer)(infoEmail, "Usuario registrado");
        res.json({
            msg: "Usuario " + nombre + " creado exitosamente"
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "¡Ha ocurrido un error!"
        });
    }
});
exports.newPersona = newPersona;
//Deshabilita a un usuario
const disabledPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    //Encuentra al usuario
    const user = yield persona_1.Person.findOne({ where: { nombre: nombre } });
    try {
        //Si se encuentra registrado
        if (!user) {
            return res.status(400).json({
                msg: "No existe usuario " + nombre
            });
        }
        if (!user.estado) {
            return res.status(401).json({
                msg: "Ya se encuentra deshabilitado"
            });
        }
        const status_User = yield persona_1.Person.update({ estado: false }, { where: { id_persona: user.id_persona } });
        if (!status_User) {
            return res.status(401).json({
                msg: "Se ha ocurrido un error con el proceso"
            });
        }
        res.status(200).json({
            msg: "Se ha deshabilitado el usuario " + nombre
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "¡Ha ocurrido un error!"
        });
    }
});
exports.disabledPersona = disabledPersona;
//Elimina a un usuario
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        // Encuentra al usuario
        const user = yield persona_1.Person.findOne({ where: { nombre: nombre } });
        // Si no se encuentra registrado
        if (!user) {
            return res.status(400).json({
                msg: "No existe usuario " + nombre
            });
        }
        // Eliminar al usuario
        const deletedRows = yield persona_1.Person.destroy({
            where: { id_persona: user.id_persona }
        });
        if (deletedRows === 1) {
            return res.status(200).json({
                msg: "Se ha eliminado el usuario " + nombre
            });
        }
        else {
            return res.status(401).json({
                msg: "No se pudo eliminar el usuario"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "¡Ha ocurrido un error!"
        });
    }
});
exports.deletePersona = deletePersona;
//Habilita a un usuario
const enabledPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    //Encuentra al usuario
    const user = yield persona_1.Person.findOne({ where: { nombre: nombre } });
    try {
        //Si se encuentra registrado
        if (!user) {
            return res.status(400).json({
                msg: "No existe usuario " + nombre
            });
        }
        if (user.estado) {
            return res.status(401).json({
                msg: "Ya se encuentra habilitado"
            });
        }
        const status_User = yield persona_1.Person.update({ estado: true }, { where: { id_persona: user.id_persona } });
        if (!status_User) {
            return res.status(401).json({
                msg: "Se ha ocurrido un error con el proceso"
            });
        }
        res.status(200).json({
            msg: "Se ha habilitado el usuario " + nombre
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "¡Ha ocurrido un error!"
        });
    }
});
exports.enabledPersona = enabledPersona;
