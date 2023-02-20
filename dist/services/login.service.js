"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const usuario_model_1 = require("../database/entities/usuario.model");
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class LoginService {
    login(nombre, password) {
        return usuario_model_1.Usuario.findOne({ where: { nombre } })
            .then((usuario) => {
            console.log(usuario);
            if (usuario === null) {
                return { resultado: false, msg: `Usuario o contraseña incorrectos` }; //QUE NO ES UN TOKEN
            }
            const checkPassword = bcrypt_1.default.compareSync(password, usuario.password);
            if (!checkPassword) {
                return {
                    resultado: false,
                    msg: `Usuario o contraseña incorrectos`
                }; //QUE NO ES UN TOKEN
            }
            let token = jwt.sign({ id: usuario.id, username: usuario.nombre }, String(config_1.default.jwt.clave), { expiresIn: '7d' });
            const date = new Date();
            date.setDate(date.getDate() + 6);
            const fecha = ("00" + date.getDate()).slice(-2);
            const month = ("00" + date.getMonth() + 1).slice(-2);
            return { resultado: true, msg: token, fecha: `${fecha}/${month}/${date.getFullYear()}` }; //NOS DEVOLVERÁ UN TOKEN
        })
            .catch((err) => {
            return { resultado: false, msg: err.message }; //QUE NO ES UN TOKEN
        });
    }
}
exports.LoginService = LoginService;
