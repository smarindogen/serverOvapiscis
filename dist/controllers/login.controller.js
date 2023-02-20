"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const login_service_1 = require("../services/login.service");
const loginService = new login_service_1.LoginService();
function login(request, response) {
    const { nombre, password } = request.body;
    if (nombre == undefined || nombre == '' || password == undefined || password == '') {
        return response.status(400).json({
            msg: "Error en los datos enviados"
        });
    }
    console.log("Nombre: " + nombre);
    console.log("Password: " + password);
    return loginService.login(nombre, password)
        .then((result) => {
        console.log(result);
        if (!result.resultado)
            return response.status(403).json({ msg: result.msg });
        return response.json({ token: result.msg, fecha: result.fecha });
    });
}
exports.login = login;