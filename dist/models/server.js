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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const curso_1 = __importDefault(require("../routers/curso"));
const persona_1 = __importDefault(require("../routers/persona"));
const auth_1 = __importDefault(require("../routers/auth"));
const module_1 = __importDefault(require("../routers/module"));
const quiz_1 = __importDefault(require("../routers/quiz"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3006";
        this.listen();
        this.middlewares();
        this.routers();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicación corriendo " + this.port);
        });
    }
    routers() {
        this.app.use("/api/cursos", curso_1.default),
            this.app.use("/api/personas", persona_1.default),
            this.app.use("/api/auth", auth_1.default),
            this.app.use("/api/module", module_1.default),
            this.app.use("/api/quiz", quiz_1.default);
    }
    middlewares() {
        //Paseo body
        this.app.use(express_1.default.json());
        //Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Connection has been established successfully.");
            }
            catch (error) {
                console.error("Unable to connect to the database ", error);
            }
        });
    }
}
exports.Server = Server;
