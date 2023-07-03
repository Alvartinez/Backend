import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Person } from "../models/persona";
import jwt from "jsonwebtoken";

export const newPersona = async (req: Request, res: Response) => { 

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Person.findOne({ where: { email: username } });
    
    if (user) {
        return res.status(400).json({
            msg: `Ya existe el Usuario ${username}`
        });
    }


    try {
        //Guardamos en la base de datos
        await Person.create({
            email: username,
            password: hashedPassword
        });

        res.json({
            msg: `Usuario ${username} creado exitosamente`
        });
    } catch (error) {
        res.status(400).json({
            msg: "Upps! Ocurrio un error", error
        });
    }

}

export const LoginPersona = async (req: Request, res: Response) => { 

    const { username, password } = req.body;

    //Validación de la existencia del usuario en la base de datos
    const user: any = await Person.findOne({ where: { email: username } });

    if (!user) {
        return res.status(400).json({
            msg: `No existe el usuario ${username} en la base de datos`
        });
    }

    //Validación Password
    const passwordValid = await bcrypt.compare(password, user.password);
    
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password incorrecta`
        });
    }

    //Generador del Token
    const token = jwt.sign({
        email: username
    }, process.env.PASSWORD_KEY || "Pepito123");

    res.json(token);

}