import { Request, Response } from "express";
import { Modulo } from "../models/modulo";
import { Quiz } from "../models/quiz_formativo";

//Obtener un modulo en específico
export const getModule = async (req:Request, res:Response) => {
    
    const id = req.params.id;

    try {

        const infoModulo = await Modulo.findOne({where: {id_modulo: id},
            include: [
                { model: Quiz,
                  as: "quiz_formativo",
                  attributes: ["id_modulo", "titulo"]
                }
            ]        
        });

        if(!infoModulo){
            res.status(400).json({
                msg: "No se encuentra información, comunique con el Admin"
            });
        }

        res.json(infoModulo);

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Se ha ocurrido un error' });
    }    

}