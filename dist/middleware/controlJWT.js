"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAndRenewToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lastActivity = new Map();
const SECRET_KEY = process.env.PASSWORD_KEY || "Magic Secret";
const time = Number(process.env.EXPIRATION_TIME) || 14400; // 4 hour in seconds
const timeout = Number(process.env.INACTIVITY_TIMEOUT) || 120; //2 minutes in seconds 
const verifyAndRenewToken = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const currentTime = Date.now() / 1000;
        const lastActivityTime = lastActivity.get(decoded.id) || 0;
        const elapsedTime = currentTime - lastActivityTime;
        if (elapsedTime > time) {
            // Si ha pasado más de 4 hora desde la última actividad, renovar el token
            renewToken(req, res);
        }
        else if (elapsedTime > timeout) {
            // Si ha pasado más de 10 minutos de inactividad, cerrar la sesión
            closeSession(decoded.id, res);
        }
        lastActivity.set(decoded.id, currentTime); // Usamos "lastActivity.set()"
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.verifyAndRenewToken = verifyAndRenewToken;
// Función para renovar el token
const renewToken = (req, res) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({ message: 'Token missing' });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const newToken = jsonwebtoken_1.default.sign({ id: decodedToken.id, username: decodedToken.username }, SECRET_KEY, { expiresIn: '4h' });
        res.header('x-token', newToken);
        res.status(200).json({ message: 'Token renewed' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error renewing token' });
    }
};
// Función para cerrar la sesión
const closeSession = (req, res) => {
    // delete lastActivity.get(userId);
    res.status(401).json({ message: 'Session closed due to inactivity' });
};
