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
exports.LoginPersona = exports.newPersona = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const persona_1 = require("../models/persona");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield persona_1.Person.findOne({ where: { email: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe el Usuario ${username}`
        });
    }
    try {
        //Guardamos en la base de datos
        yield persona_1.Person.create({
            email: username,
            password: hashedPassword
        });
        res.json({
            msg: `Usuario ${username} creado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Upps! Ocurrio un error", error
        });
    }
});
exports.newPersona = newPersona;
const LoginPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Validación de la existencia del usuario en la base de datos
    const user = yield persona_1.Person.findOne({ where: { email: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario ${username} en la base de datos`
        });
    }
    //Validación Password
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password incorrecta`
        });
    }
    //Generador del Token
    const token = jsonwebtoken_1.default.sign({
        email: username
    }, process.env.PASSWORD_KEY || "Pepito123");
    res.json(token);
});
exports.LoginPersona = LoginPersona;
