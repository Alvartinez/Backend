import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Person } from "../models/persona";
import { Aprendiz } from "../models/aprendiz";
import jwt from "jsonwebtoken";

//Trae la información del usuario
export const getPerson = async (req: Request, res: Response) => { 
  
  const listPerson = await Person.findAll();

  if (listPerson != null) {
    return res.status(400).json({
      msg: "No existe ningún registro"
    });
  }

  res.json(listPerson);

}

//Crear un nuevo usuario
export const newPersona = async (req: Request, res: Response) => {
  
  const { nombre, email, password } = req.body;

  //Validar si existe el usuario
  const user = await Person.findOne({ where: { email: email } });

  if (user) {
    return res.status(400).json({
      msg:"Ya existe el usuario "+nombre+"."
    });
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dateStr = `${day}-${month}-${year}`;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    //Creación del usuario
    const persona = await Person.create({
      id_usuario: 1,
      nombre: nombre,
      email: email,
      password: hashedPassword,
      estado: true
    });

    //Traemos el id del usuario creado
    const identifiador = persona.get();
    const idPersona = identifiador.id_persona;

    //Se crea por defecto como rol aprendiz
    await Aprendiz.create({
      id_persona: idPersona, 
      fecha_registro: dateStr
    });

    res.json({
      msg: "Usuario" +nombre+ "creado exitosamente",
    });

  } catch (error) {
    res.status(400).json({
      msg: "¡Ha ocurrido un error!"
    });

  }

}

//El usuario inicia sesión
export const LoginPersona = async (req: Request, res: Response) => { 

  const { email, password } = req.body;
  
  //Valida si el usuario existe
  const user: any = await Person.findOne({ where: { email: email } });
  
  try { 
    if (!user) {
      return res.status(400).json({
        msg: "El usuario no existe, verifique el correo o contraseña"
      });
    }

    //Valida el password
    const passwordValid = await bcrypt.compare(password, user.password);
  
    if (!passwordValid) {
      console.log("hola")
      return res.status(400).json({
        msg: "Correo eléctronico o contraseña no valida"
      });
    }

    if (!user.estado) {
      console.log("Estado Desactivado")
      return res.status(400).json({
        msg: user.nombre+" no se encuentra activo, comuníquese con el ADMIN"
      });
    }

    //Se genera el token
    const token = jwt.sign({
      email:email
    }, process.env.PASSWORD_KEY || "Magic Secret");

    res.json(token);
    
  } catch (error) {
    res.status(400).json({
      msg: "¡Ha ocurrido un error!"
    });
  }

}

//Elimina a un usuario
export const deletePersona = async (req: Request, res: Response) => { 

  const { email } = req.body;  

  //Encuentra al usuario
  const user: any = await Person.findOne({ where: { email: email } });

  //Si se encuentra registrado
  if (!user) {
    return res.status(400).json({
      msg: "Se ha generado un error, comuníquese con el ADMIN"
    });
  }

  //Se procede a cambiar el estado
  
}