import { Request, Response } from "express";
import {Course} from "../models/curso";
import { Person } from "../models/persona";
import { CourseModule } from "../models/curso_modulo";
import { Modulo } from "../models/modulo";


export const getAllCourses = async (req:Request, res:Response) => {
    
    try {
      const availableCourses = await Course.findAll({
        include: {
          model: Person,
          as: "persona",
          attributes: ["nombre", "email"],
        },
      });
  
      const cursosInfo = availableCourses.map((curso:any) => {
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Se ha producido un error" });
    }
};


export const getPeopleCourse = async (req: Request, res: Response) => {



}

export const getCurso = async (req: Request, res: Response) => {
    
    const id = req.params.id;

    try{

        const selectedCourse: any = await Course.findOne({ 
            where: { id_curso: id },
            include: {
                model: Person,
                as: "persona",
                attributes: ["nombre", "email"]
            }
        });

        if(selectedCourse){
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

              const modules = await CourseModule.findAll({
                where: { id_curso: id },
                attributes: ['id_modulo'], 
                include: {
                    model: Modulo,
                    as: "modulo",
                    attributes: ["nombre"]
                }
            });

            // Formateamos los módulos para que solo contengan id_modulo y nombre
            courseInfo.modulos = modules.map((module: any) => ({
                id_modulo: module.id_modulo,
                nombre: module.modulo.nombre
            }));
        
            res.json(courseInfo);
    
        }else{
           return res.status(400).json({
                msg: "No existe ese curso"
            });
        }

    }catch(error){
        console.error(error);
        res.status(400).json({ msg: 'Se ha ocurrido un error' });
    }


}

