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
exports.getResultsQuiz = exports.resultadoQuiz = void 0;
const quiz_seleccion_1 = require("../models/quiz_seleccion");
const quiz_empareja_1 = require("../models/quiz_empareja");
const respuesta_quiz_1 = require("../models/respuesta_quiz");
const quiz_formativo_1 = require("../models/quiz_formativo");
const inscrito_1 = require("../models/inscrito");
const curso_modulo_1 = require("../models/curso_modulo");
const resultadoQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_persona, id_quiz_formativo, id_pregunta, enunciado, fecha_respuesta, opcion, tipo_pregunta, multiple, puntaje } = req.body;
    try {
        // Verificar si el tipo de pregunta es 'seleccion' o 'empareja'
        let quizPregunta;
        if (tipo_pregunta === 'seleccion') {
            quizPregunta = yield quiz_seleccion_1.QuizSelection.findOne({ where: { id_seleccion: id_pregunta } });
            console.log("Soy una pregunta de seleccion XD");
        }
        else if (tipo_pregunta === 'empareja') {
            quizPregunta = yield quiz_empareja_1.QuizMatch.findOne({ where: { id_empareja: id_pregunta } });
            console.log("Soy una pregunta de emparejar XD");
        }
        else {
            return res.status(400).json({ msg: "Tipo de pregunta no válido" });
        }
        if (!quizPregunta) {
            return res.status(400).json({ msg: "La pregunta no existe" });
        }
        // Verificar si el quiz existe
        const quizExiste = yield quiz_formativo_1.Quiz.findOne({ where: { id_quiz_formativo } });
        if (!quizExiste) {
            return res.status(400).json({ msg: "El quiz no existe" });
        }
        const moduloExiste = yield curso_modulo_1.CourseModule.findOne({ where: { id_modulo: quizExiste.id_modulo } });
        if (!moduloExiste) {
            return res.status(400).json({ msg: "El modulo no existe" });
        }
        // Verificar si el usuario está inscrito en el curso
        const estaInscrito = yield inscrito_1.Inscrito.findOne({
            where: { id_persona, id_curso: moduloExiste.id_curso }
        });
        if (!estaInscrito) {
            return res.status(400).json({ msg: "El usuario no está inscrito en el curso" });
        }
        console.log("el usuario esta inscrito");
        const quizRealizado = yield respuesta_quiz_1.ResponseQuiz.findOne({
            where: { id_persona, id_quiz_formativo }
        });
        console.log(quizRealizado);
        if (quizRealizado) {
            const nuevaRespuesta = {
                id_persona,
                id_quiz_formativo,
                id_pregunta,
                enunciado,
                opcion,
                tipo_pregunta,
                multiple,
                puntaje
            };
            const newResponse = yield respuesta_quiz_1.ResponseQuiz.update({ respuestas: nuevaRespuesta }, { where: { id_persona, id_quiz_formativo } });
            if (!newResponse) {
                return res.status(400).json({ msg: "Se ha generado un error" });
            }
            console.log(newResponse);
            return res.json({ msg: "Respuesta guardada exitosamente." });
        }
        const resultado = {
            id_persona,
            id_quiz_formativo,
            id_pregunta,
            enunciado,
            fecha_respuesta,
            opcion,
            tipo_pregunta,
            multiple,
            puntaje
        };
        //Guardar la respuesta en la tabla respuesta_quiz
        yield respuesta_quiz_1.ResponseQuiz.create({
            id_persona: id_persona,
            id_quiz_formativo: id_quiz_formativo,
            respuestas: resultado
        });
        return res.json({ msg: "Respuesta guardada exitosamente" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Se ha ocurrido un error' });
    }
});
exports.resultadoQuiz = resultadoQuiz;
const getResultsQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield respuesta_quiz_1.ResponseQuiz.findAll();
        res.json(results);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Se ha producido un error" });
    }
});
exports.getResultsQuiz = getResultsQuiz;
