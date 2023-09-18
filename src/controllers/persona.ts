import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Person } from "../models/persona";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateRandomUsername } from "../helper/randomUsername";
import { User } from "../models/user";
import { enviarMensajeInsideServer } from "../helper/sendEmail";
import { Rol } from "../models/rol";

//Trae una lista de usuarios
export const getPeople = async (req: Request, res: Response) => { 
  
  try {
    const listPerson = await Person.findAll({
      include: [
        { 
          model: User, 
          as: 'user', 
          include: [
            { model: Rol, as: 'rol' }
          ]
        }
      ]
    });

    if(!listPerson){
      res.status(400).json({
        msg: "Se ha ocurrido, consulta al Admin"
      });
    }

    res.json({listPerson});

  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: 'Se ha ocurrido un error'
    });
  }
}

//Trae a un usuario en específico 
export const getPerson = async (req:Request, res:Response) => {

  const token:any = req.headers.authorization?.split(" ")[1];
  const secretKey = process.env.PASSWORD_KEY || "Magic Secret";

  try {

    const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

    const userId = decodedToken.id;

    const user:any = await Person.findOne({ where: { id_persona: userId } });

    if (user) {
      const userInfo = {
        nombre: user.nombre,
        username: user.username,
        email: user.email,
        fecha_registro: user.fecha_registro,
        rol: decodedToken.rol
      };

      res.json(userInfo);

    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }

  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'Se ha ocurrido un error' });
  }
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
  const dateStr = `${year}-${month}-${day}`;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  let username = generateRandomUsername(nombre);

  let isUsernameTaken = await User.findOne({ where: { username: username } });

  while (isUsernameTaken) {
    username = generateRandomUsername(nombre);
    isUsernameTaken = await User.findOne({ where: { username: username } });
  }

  try {
    //Creación del usuario
    const persona = await Person.create({
      nombre: nombre,
      email: email,
      estado: true,
      fecha_registro: dateStr
    });

    const id: any = await Person.findOne({where: {email: email}});

    const rolPerson = await User.create({
      id_persona: id.id_persona,
      id_rol: 1,
      username: username,
      password: hashedPassword
    });

    //Información para usar en el email
    const infoEmail = {
      nombre,
      username,
      email,
      password
    }

    await enviarMensajeInsideServer( infoEmail, "Usuario registrado" );


    res.json({
      msg: "Usuario " +nombre+ " creado exitosamente"
    });

  } catch (error) {
    res.status(400).json({
      msg: "¡Ha ocurrido un error!"
    });

  }

}

//Deshabilita a un usuario
export const disabledPersona = async (req: Request, res: Response) => { 

  const {nombre} = req.body;

  //Encuentra al usuario
  const user: any = await Person.findOne({ where: { nombre: nombre } });

  try{

    //Si se encuentra registrado
    if (!user) {
      return res.status(400).json({
        msg: "No existe usuario "+ nombre
      });
    }

    if(!user.estado){
      return res.status(401).json({
        msg: "Ya se encuentra deshabilitado"
      });
    }

    const status_User = await Person.update(
      {estado: false},
      {where: {id_persona: user.id_persona}}
    );

    if(!status_User){
      return res.status(401).json({
        msg: "Se ha ocurrido un error con el proceso"}
      );
    }

    res.status(200).json({
      msg: "Se ha deshabilitado el usuario "+ nombre
    });

  } catch (error) {
    res.status(400).json({
      msg: "¡Ha ocurrido un error!"
    });
  }
  
}

//Elimina a un usuario
export const deletePersona = async (req: Request, res: Response) => {

  const { nombre } = req.body;

  try {
    // Encuentra al usuario
    const user: any = await Person.findOne({ where: { nombre: nombre } });

    // Si no se encuentra registrado
    if (!user) {
      return res.status(400).json({
        msg: "No existe usuario " + nombre
      });
    }

    // Eliminar al usuario
    const deletedRows = await Person.destroy({
      where: { id_persona: user.id_persona }
    });

    if (deletedRows === 1) {
      return res.status(200).json({
        msg: "Se ha eliminado el usuario " + nombre
      });
    } else {
      return res.status(401).json({
        msg: "No se pudo eliminar el usuario"
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "¡Ha ocurrido un error!"
    });
  }

}

//Habilita a un usuario
export const enabledPersona = async (req: Request, res: Response) => {

  const {nombre} = req.body;

  //Encuentra al usuario
  const user: any = await Person.findOne({ where: { nombre: nombre } });

  try{

    //Si se encuentra registrado
    if (!user) {
      return res.status(400).json({
        msg: "No existe usuario "+ nombre
      });
    }

    if(user.estado){
      return res.status(401).json({
        msg: "Ya se encuentra habilitado"
      });
    }

    const status_User = await Person.update(
      {estado: true},
      {where: {id_persona: user.id_persona}}
    );

    if(!status_User){
      return res.status(401).json({
        msg: "Se ha ocurrido un error con el proceso"
      }
      );
    }

    res.status(200).json({
      msg: "Se ha habilitado el usuario "+ nombre
    });

  } catch (error) {
    res.status(400).json({
      msg: "¡Ha ocurrido un error!"
    });
  }

} 