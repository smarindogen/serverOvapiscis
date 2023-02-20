import * as Sequelize from "sequelize";
import {mysql} from "../mysql.config";

export interface TanqueModel extends Sequelize.Model {
    id: number,
    nombre: string

}

export interface NewTanqueModel {
    id?: number,
    nombre: string

}

export const Tanque = mysql.define<TanqueModel, NewTanqueModel>('tanques', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING

}, {underscored: true, timestamps: true})
