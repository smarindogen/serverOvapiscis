import * as Sequelize from "sequelize";
import {mysql} from "../mysql.config";

export interface UsuarioModel extends Sequelize.Model {
    id: number;
    nombre: string;
    password: string;
}

export interface NewUsuarioModel {
    id?: number;
    nombre: string;
    password: string,
}

export const Usuario = mysql.define<UsuarioModel, NewUsuarioModel>('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {underscored: true, timestamps: true})