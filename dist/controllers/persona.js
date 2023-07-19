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
exports.deletePersona = exports.LoginPersona = exports.newPersona = exports.getPerson = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const persona_1 = require("../models/persona");
const aprendiz_1 = require("../models/aprendiz");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Trae la información del usuario
const getPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPerson = yield persona_1.Person.findAll();
    if (listPerson != null) {
        return res.status(400).json({
            msg: "No existe ningún registro"
        });
    }
    res.json(listPerson);
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
    const dateStr = `${day}-${month}-${year}`;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        //Creación del usuario
        const persona = yield persona_1.Person.create({
            id_usuario: 1,
            nombre: nombre,
            email: email,
            password: hashedPassword,
            estado: true
        });
        //Traemos el id del usuario creado
        const identifiador = persona.get();
        const idPersona = identifiador.id_persona;
        //Se crea por defecto como rol aprendiz
        yield aprendiz_1.Aprendiz.create({
            id_persona: idPersona,
            fecha_registro: dateStr
        });
        res.json({
            msg: "Usuario" + nombre + "creado exitosamente",
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "¡Ha ocurrido un error!"
        });
    }
});
exports.newPersona = newPersona;
//El usuario inicia sesión
const LoginPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //Valida si el usuario existe
    const user = yield persona_1.Person.findOne({ where: { email: email } });
    try {
        if (!user) {
            return res.status(400).json({
                msg: "El usuario no existe, verifique el correo o contraseña"
            });
        }
        //Valida el password
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            console.log("hola");
            return res.status(400).json({
                msg: "Correo eléctronico o contraseña no valida"
            });
        }
        if (!user.estado) {
            console.log("Estado Desactivado");
            return res.status(400).json({
                msg: user.nombre + " no se encuentra activo, comuníquese con el ADMIN"
            });
        }
        //Se genera el token
        const token = jsonwebtoken_1.default.sign({
            email: email
        }, process.env.PASSWORD_KEY || "Magic Secret");
        res.json(token);
    }
    catch (error) {
        res.status(400).json({
            msg: "¡Ha ocurrido un error!"
        });
    }
});
exports.LoginPersona = LoginPersona;
//Elimina a un usuario
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    //Encuentra al usuario
    const user = yield persona_1.Person.findOne({ where: { email: email } });
    //Si se encuentra registrado
    if (!user) {
        return res.status(400).json({
            msg: "Se ha generado un error, comuníquese con el ADMIN"
        });
    }
    //Se procede a cambiar el estado
});
exports.deletePersona = deletePersona;
