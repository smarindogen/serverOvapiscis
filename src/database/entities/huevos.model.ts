import * as Sequelize from "sequelize";
import {mysql} from "../mysql.config";
import {Trucha} from "./trucha.model";

export interface HuevosModel extends Sequelize.Model {
    id: number,
    idMadre: number,
    nPuesta: number,
    grHuevasBuenas: number,
    grHuevasMalas: number,
    ne: number,
    op: number,
    tamanoHueva: number
}

export interface NewHuevosModel {
    id?: number,
    idMadre: number,
    nPuesta: number,
    grHuevasBuenas?: number,
    grHuevasMalas?: number,
    ne?: number,
    op?: number,
    tamanoHueva?: number
}

export const Huevos = mysql.define<HuevosModel, NewHuevosModel>('huevos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idMadre: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    nPuesta: {type: Sequelize.INTEGER, allowNull: false},
    grHuevasBuenas: {type: Sequelize.DOUBLE, defaultValue: 0.0},
    grHuevasMalas: {type: Sequelize.DOUBLE, defaultValue: 0.0},
    ne: {type: Sequelize.DOUBLE, defaultValue: 0.0},
    op: {type: Sequelize.DOUBLE, defaultValue: 0.0},
    tamanoHueva: {type: Sequelize.DOUBLE, defaultValue: 0.0},

}, {underscored: true, timestamps: true})


Huevos.hasOne(Trucha, {foreignKey: 'id_madre'})
