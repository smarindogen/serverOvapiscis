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
exports.authMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function authMiddleware(request, response, next) {
    //recuperar token
    let token = request.get('Authorization');
    if (token == undefined) {
        return response.status(401).json({ msg: "No se ha encontrado ningún token" });
    }
    return jwt.verify(token, String(config_1.default.jwt.clave), (err, payload) => {
        if (err) {
            console.log(err);
            return response.status(401).json({ msg: "Token invalido" }); //<-- al ver un return salimos de la función
        }
        if (payload) {
            return next();
        }
        else {
            return response.status(401).json({ msg: 'Token invalido' });
        }
    });
}
exports.authMiddleware = authMiddleware;
