import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Person } from "../models/persona";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateJWT } from "../helper/generateJWT";
import { User } from "../models/user";
import { Rol } from "../models/rol";
import { QueryTypes } from 'sequelize'; 
import sequelize from "../db/connection";
import { enviarMensajeInsideServer } from "../helper/sendEmail";

//El usuario inicia sesión
export const LoginPersona = async (req: Request, res: Response) => { 

    const { username, password } = req.body;
    
    try { 

        // Buscar el usuario por su username
      const user:any = await User.findOne({where: { username: username },
           include: [
                { model: Person, as: "persona" },
                { model: Rol, as: "rol" }
            ]
      });

      if (!user) {
        return res.status(400).json({
          msg: "El usuario no existe, verifique el username o contraseña"
        });
      }
  
      //Valida el password
      const passwordValid = await bcrypt.compare(password, user.password);
    
      if (!passwordValid) {
        return res.status(400).json({
          msg: "username o contraseña no valida"
        });
      }
  
      if (!user.persona.estado) {
        console.log("Estado Desactivado");
        return res.status(400).json({
          msg: user.persona.nombre+" no se encuentra activo, comuníquese con el ADMIN"
        });
      }
      const id = user.persona.id_persona;
  
      const rol = user.rol.cargo;
  
      // Se genera el token
      const token = await generateJWT(id, username, rol); 

      // Redirigir según los roles
    if (rol === "Aprendiz") {
        return res.status(200).json({
          msg: "Login exitoso",
          token: token,
          redirectTo: "user-home"
        });
      } else if (rol === "Docente") {
        return res.status(200).json({
          msg: "Login exitoso",
          token: token,
          redirectTo: "doc-home"
        });
      } else if (rol === "Admin") {
        return res.status(200).json({
          msg: "Login exitoso",
          token: token,
          redirectTo: "admin-home"
        });
      } else if (rol === "Visitante"){
        return res.status(200).json({
          msg: "Login exitoso",
          token: token,
          redirectTo: "vist-home"
        });
      }
  
      // Si no se encuentra un rol válido para redirección, mostrar un mensaje de error
      return res.status(400).json({
        msg: "Usuario sin rol válido para redirección"
      });
      
    } catch (error) {
      console.error("Error:", error);
      res.status(400).json({
        msg: "¡Ha ocurrido un error!",
      });
    }
  
}

export const getPeopleWithCourses = async (req: Request, res: Response) => { 
  try {

    const listPeopleWithCourses = await sequelize.query(`
    SELECT
    p.id_persona,
    p.nombre,
    p.email,
    p.estado,
    p.fecha_registro,
    JSON_AGG(
      json_build_object(
        'id_curso', c.id_curso,
        'nombre_curso', c.nombre,
        'fecha_inscripcion', i.fecha_inscripcion
      )
    ) as cursos
    FROM
      persona p
    INNER JOIN
      inscrito i ON p.id_persona = i.id_persona
    INNER JOIN
      curso c ON i.id_curso = c.id_curso
    GROUP BY
      p.id_persona;
    `, { type: QueryTypes.SELECT });

    res.json({ listPeopleWithCourses });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      msg: "¡Ha ocurrido un error!",
    });
  }
}

//Cambiar la contraseña
export const changePassword = async (req: Request, res: Response) => {
    
    const token = req.header("x-token");
    const { password, newPassword } = req.body;

    try {
        if (!token) {
            return res.status(400).json({ message: 'Token missing' });
        }

        const decoded = jwt.verify(token, process.env.PASSWORD_KEY || "Magic Secret") as JwtPayload;

        const user: any = await User.findOne({ where: { id_persona: decoded.id } });

        if (!user) {
            return res.status(400).json({
                msg: "Usuario no encontrado"
            });
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return res.status(400).json({
                msg: "Las contraseñas no coinciden, verifica"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.update(
            { password: hashedPassword },
            { where: { id_persona: user.id_persona } }
        );

        const newToken = generateJWT(decoded.id, user.username, decoded.rol);

        return res.status(200).json({
            msg: "Contraseña actualizada",
            newToken
        });

    } catch (error) {
        return res.status(400).json({
            msg: '¡Ha ocurrido un error!'
        });
    }
}

/* export const forgetPassword = async (req: Request, res: Response) => {

    const { identifier } = req.body;

    if (!identifier) {
        return res.status(400).json({
            msg: "Debe proporcionar un email o username"
        });
    }

    try {
        const person: any = await Person.findOne({
            where: {
                [Op.or]:[
                    { email: identifier },
                    { username: identifier }                    
                ]
            }
        });

        if (!person) {
            return res.status(401).json({
                msg: "Usuario no encontrado, verifica el email o username"
            });
        }

        const id = person.id_persona;

        const rol = await getRoles(id);

        const token = jwt.sign(
            { id: id, rol: rol },
            process.env.PASSWORD_KEY || "Magic Secret",
            {
                expiresIn: "1h"
            }
        );

        return res.json(token);

    } catch (error) {
        return res.status(401).json({
            msg: '¡Ha ocurrido un error!'
        });
    }
} */