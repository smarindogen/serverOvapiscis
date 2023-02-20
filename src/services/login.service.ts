import {Usuario, UsuarioModel} from "../database/entities/usuario.model";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import bcrypt from "bcrypt";

export class LoginService {
    login(nombre: string, password: string): Promise<ResultLogin> {
        return Usuario.findOne({where: {nombre}})
            .then((usuario: UsuarioModel | null) => {
                console.log(usuario);
                if (usuario === null) {
                    return {resultado: false, msg: `Usuario o contraseña incorrectos`}; //QUE NO ES UN TOKEN
                }
                const checkPassword = bcrypt.compareSync(password, usuario.password)
                if (!checkPassword) {
                    return {
                        resultado: false,
                        msg: `Usuario o contraseña incorrectos`
                    };//QUE NO ES UN TOKEN
                }
                let token = jwt.sign(
                    {id: usuario.id, username: usuario.nombre},
                    String(config.jwt.clave),
                    {expiresIn: '7d'}
                )
                const date = new Date();
                date.setDate(date.getDate() + 6)
                const fecha = ("00" + date.getDate()).slice(-2)
                const month = ("00" + date.getMonth()+1).slice(-2);
                return {resultado: true, msg: token, fecha: `${fecha}/${month}/${date.getFullYear()}`}; //NOS DEVOLVERÁ UN TOKEN
            })
            .catch((err: Error) => {
                return {resultado: false, msg: err.message}; //QUE NO ES UN TOKEN
            })


    }
}

export interface ResultLogin {
    resultado: boolean,
    msg: string
    fecha?: string
}
