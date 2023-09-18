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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModule = void 0;
const modulo_1 = require("../models/modulo");
const quiz_formativo_1 = require("../models/quiz_formativo");
//Obtener un modulo en específico
const getModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const infoModulo = yield modulo_1.Modulo.findOne({ where: { id_modulo: id },
            include: [
                { model: quiz_formativo_1.Quiz,
                    as: "quiz_formativo",
                    attributes: ["id_modulo", "titulo"]
                }
            ]
        });
        if (!infoModulo) {
            res.status(400).json({
                msg: "No se encuentra información, comunique con el Admin"
            });
        }
        res.json(infoModulo);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Se ha ocurrido un error' });
    }
});
exports.getModule = getModule;
