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
exports.getCurso = exports.getPeopleCourse = exports.getAllCourses = void 0;
const curso_1 = require("../models/curso");
const persona_1 = require("../models/persona");
const curso_modulo_1 = require("../models/curso_modulo");
const modulo_1 = require("../models/modulo");
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableCourses = yield curso_1.Course.findAll({
            include: {
                model: persona_1.Person,
                as: "persona",
                attributes: ["nombre", "email"],
            },
        });
        const cursosInfo = availableCourses.map((curso) => {
            return {
                id_curso: curso.id_curso,
                nombre: curso.nombre,
                descripcion: curso.descripcion,
                objetivos: curso.objetivos,
                creador: {
                    nombre: curso.persona.nombre,
                    email: curso.persona.email,
                },
                portada: curso.portada
            };
        });
        res.json(cursosInfo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Se ha producido un error" });
    }
});
exports.getAllCourses = getAllCourses;
const getPeopleCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getPeopleCourse = getPeopleCourse;
const getCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const selectedCourse = yield curso_1.Course.findOne({
            where: { id_curso: id },
            include: {
                model: persona_1.Person,
                as: "persona",
                attributes: ["nombre", "email"]
            }
        });
        if (selectedCourse) {
            const courseInfo = {
                nombre: selectedCourse.nombre,
                descripcion: selectedCourse.descripcion,
                objetivos: selectedCourse.objetivos,
                presentacion: selectedCourse.video_presentacion,
                creador: {
                    nombre: selectedCourse.persona.nombre,
                    email: selectedCourse.persona.email
                },
                portada: selectedCourse.portada,
                modulos: {}
            };
            const modules = yield curso_modulo_1.CourseModule.findAll({
                where: { id_curso: id },
                attributes: ['id_modulo'],
                include: {
                    model: modulo_1.Modulo,
                    as: "modulo",
                    attributes: ["nombre"]
                }
            });
            // Formateamos los módulos para que solo contengan id_modulo y nombre
            courseInfo.modulos = modules.map((module) => ({
                id_modulo: module.id_modulo,
                nombre: module.modulo.nombre
            }));
            res.json(courseInfo);
        }
        else {
            return res.status(400).json({
                msg: "No existe ese curso"
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Se ha ocurrido un error' });
    }
});
exports.getCurso = getCurso;
