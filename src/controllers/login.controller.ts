import express from "express";
import {LoginService, ResultLogin} from "../services/login.service";

const loginService = new LoginService()

export function login(request: express.Request, response: express.Response) {
    const {nombre, password} = request.body
    if (nombre == undefined || nombre == '' || password == undefined || password == '') {
        return response.status(400).json({
            msg: "Error en los datos enviados"
        })
    }
    console.log("Nombre: " + nombre);
    console.log("Password: " + password);
    return loginService.login(nombre, password)
        .then((result: ResultLogin) => {
            console.log(result);
            if (!result.resultado)
                return response.status(403).json({msg: result.msg})
            return response.json({token: result.msg,fecha: result.fecha})
        })


}
