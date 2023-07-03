import { Request, Response } from "express";

export const getCurso = (req: Request, res: Response) => {
    res.json({
        msg: "Funciono"
    })
}