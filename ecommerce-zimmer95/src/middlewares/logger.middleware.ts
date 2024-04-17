import { NextFunction, Request, Response } from "express";

export function loggerGlobal ( req: Request, res: Response, next: NextFunction){
    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const formattedTime = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    console.log(`[${formattedDate} - ${formattedTime}] Estás ejecutando un método ${req.method} en la ruta ${req.url}`);
    next();
}