import express from "express";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import {JwtPayload, VerifyErrors} from "jsonwebtoken";
export function authMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
    //recuperar token
    let token: string | undefined = request.get('Authorization')
    if (token == undefined) {
        return response.status(401).json({msg: "No se ha encontrado ningún token"})
    }
    return jwt.verify(token, String(config.jwt.clave), (err: VerifyErrors | null, payload: JwtPayload | undefined) => {
        if (err) {
            console.log(err);
            return response.status(401).json({msg: "Token invalido"}) //<-- al ver un return salimos de la función
        }
        if (payload) {
            return next();
        } else {
            return response.status(401).json({msg: 'Token invalido'})
        }
    })
}
