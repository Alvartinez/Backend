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
exports.obtenerRole = exports.getRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rol_1 = require("../models/rol");
const user_1 = require("../models/user");
const getRoles = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.PASSWORD_KEY || "Magic Secret");
    const rol = yield user_1.User.findOne({ where: { id_persona: decoded.id_persona } });
    try {
        if (!rol) {
            return null;
        }
        const roles = yield rol_1.Rol.findAll({
            where: { id_rol: rol.id_rol },
            attributes: ["id_rol", "cargo"],
        });
        if (!roles) {
            return null;
        }
        return roles;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.getRoles = getRoles;
const obtenerRole = (usuarioToken) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioRol = yield rol_1.Rol.findOne({
        where: { id: usuarioToken.id_rol },
    });
    let role = undefined;
    if (!usuarioRol) {
        return null;
    }
    role = usuarioRol.cargo;
    return role;
});
exports.obtenerRole = obtenerRole;
