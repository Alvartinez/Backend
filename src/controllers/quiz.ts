import { Request, Response } from "express";
import { Quiz } from "../models/quiz_formativo";
import { Match } from "../models/empareja";
import { Select } from "../models/seleccion";
import { QuizMatch } from "../models/quiz_empareja";
import { QuizSelection } from "../models/quiz_seleccion";

export const getQuiz = async (req:Request, res:Response) => {

    const id = req.params.id;

    try{

        const quiz: any = await Quiz.findOne({where: { id_quiz_formativo: id },
            include: [
                {
                    model: QuizMatch,
                    as: 'quiz_empareja',
                    include: [
                        {
                            model: Match,
                            as: 'empareja'
                        }
                    ]
                },
                {
                    model: QuizSelection,
                    as: 'quiz_seleccion',
                    include: [
                        {
                            model: Select,
                            as: 'seleccion'
                        }
                    ]
                }
            ]
        });

        if(!quiz){
            res.status(400).json({
                msg: "No se encuentra información, comunique con el Admin"
            });
        }

        res.json(quiz);

    }catch (error){
        console.error(error);
        res.status(400).json({ msg: 'Se ha ocurrido un error' });
    }

}