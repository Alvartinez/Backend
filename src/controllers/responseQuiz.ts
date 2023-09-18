import { Request, Response } from "express";
import { QuizSelection } from "../models/quiz_seleccion";
import { QuizMatch } from "../models/quiz_empareja";
import { ResponseQuiz } from "../models/respuesta_quiz";
import { Quiz } from "../models/quiz_formativo";
import { Inscrito } from "../models/inscrito";
import { CourseModule } from "../models/curso_modulo";

export const resultadoQuiz = async (req:Request, res:Response) => {

    const { 
        id_persona, 
        id_quiz_formativo, 
        id_pregunta, 
        enunciado, 
        fecha_respuesta, 
        opcion, 
        tipo_pregunta, 
        multiple, 
        puntaje
     } = req.body;

    try{

        // Verificar si el tipo de pregunta es 'seleccion' o 'empareja'
        let quizPregunta;
        if (tipo_pregunta === 'seleccion') {
            quizPregunta = await QuizSelection.findOne({ where: { id_seleccion: id_pregunta } });
            console.log("Soy una pregunta de seleccion XD");
            
        } else if (tipo_pregunta === 'empareja') {
            quizPregunta = await QuizMatch.findOne({ where: { id_empareja: id_pregunta } });
            console.log("Soy una pregunta de emparejar XD");

        } else {
            return res.status(400).json({ msg: "Tipo de pregunta no válido" });
        }

        if (!quizPregunta) {
            return res.status(400).json({ msg: "La pregunta no existe" });
        }

        // Verificar si el quiz existe
        const quizExiste:any = await Quiz.findOne({ where: { id_quiz_formativo } });
        if (!quizExiste) {
            return res.status(400).json({ msg: "El quiz no existe" });
        }

        const moduloExiste:any = await CourseModule.findOne({where: {id_modulo: quizExiste.id_modulo}});
        if(!moduloExiste){
            return res.status(400).json({ msg: "El modulo no existe" });
        }

        // Verificar si el usuario está inscrito en el curso
        const estaInscrito = await Inscrito.findOne({
            where: { id_persona, id_curso: moduloExiste.id_curso }
        });

        if (!estaInscrito) {
            return res.status(400).json({ msg: "El usuario no está inscrito en el curso" });
        }

        console.log("el usuario esta inscrito")

        const quizRealizado = await ResponseQuiz.findOne({
            where: { id_persona, id_quiz_formativo }
        });

        console.log(quizRealizado);

        if(quizRealizado){

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

            const newResponse = await ResponseQuiz.update(
                {respuestas: nuevaRespuesta},
                {where: {id_persona, id_quiz_formativo}}
            );

            if(!newResponse){
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
        }

        //Guardar la respuesta en la tabla respuesta_quiz
        await ResponseQuiz.create({
            id_persona: id_persona,
            id_quiz_formativo: id_quiz_formativo,
            respuestas: resultado
        });

        return res.json({ msg: "Respuesta guardada exitosamente" });
    
    }catch (error){
        console.error(error);
        res.status(400).json({ msg: 'Se ha ocurrido un error' });
    }    

}

export const getResultsQuiz = async (req:Request, res:Response) =>{

    try {

        const results = await ResponseQuiz.findAll();
    
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Se ha producido un error" });
    }    
}