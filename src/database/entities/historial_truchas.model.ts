import * as Sequelize from "sequelize";
import {mysql} from "../mysql.config";
import {Trucha} from "./trucha.model";

export interface HistorialTruchaModel extends Sequelize.Model {
    id: number,
    peso: number,
    mida: number
}

export interface NewHistorialTruchaModel {
    id: number,
    fecha: Date,
    peso: number,
    mida: number

}

export const HistorialTrucha = mysql.define<HistorialTruchaModel, NewHistorialTruchaModel>('historial_truchas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fecha: {
        type: Sequelize.DATE,
        primaryKey: true
    },
    peso: Sequelize.FLOAT,
    mida: Sequelize.FLOAT
}, {underscored: true, timestamps: true})
