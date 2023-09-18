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
exports.getQuiz = void 0;
const quiz_formativo_1 = require("../models/quiz_formativo");
const empareja_1 = require("../models/empareja");
const seleccion_1 = require("../models/seleccion");
const quiz_empareja_1 = require("../models/quiz_empareja");
const quiz_seleccion_1 = require("../models/quiz_seleccion");
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const quiz = yield quiz_formativo_1.Quiz.findOne({ where: { id_quiz_formativo: id },
            include: [
                {
                    model: quiz_empareja_1.QuizMatch,
                    as: 'quiz_empareja',
                    include: [
                        {
                            model: empareja_1.Match,
                            as: 'empareja'
                        }
                    ]
                },
                {
                    model: quiz_seleccion_1.QuizSelection,
                    as: 'quiz_seleccion',
                    include: [
                        {
                            model: seleccion_1.Select,
                            as: 'seleccion'
                        }
                    ]
                }
            ]
        });
        if (!quiz) {
            res.status(400).json({
                msg: "No se encuentra información, comunique con el Admin"
            });
        }
        res.json(quiz);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Se ha ocurrido un error' });
    }
});
exports.getQuiz = getQuiz;
