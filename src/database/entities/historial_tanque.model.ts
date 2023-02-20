import * as Sequelize from "sequelize";
import {mysql} from "../mysql.config";
import {Trucha} from "./trucha.model";
import {Tanque} from "./tanque.model";

export interface HistorialTanqueModel extends Sequelize.Model {
    idTanque: number,
    idTrucha: number,
    fecha: Date

}

export interface NewHistorialTanqueModel {
    idTanque: number,
    idTrucha: number,
    fecha: Date

}

export const HistorialTanque = mysql.define<HistorialTanqueModel, NewHistorialTanqueModel>('historial_tanques', {
    idTanque: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idTrucha: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fecha: Sequelize.DATE
}, {underscored: true, timestamps: true})

HistorialTanque.belongsTo(Trucha)
HistorialTanque.belongsTo(Tanque)
