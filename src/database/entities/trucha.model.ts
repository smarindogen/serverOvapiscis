import * as Sequelize from "sequelize";
import {mysql} from "../mysql.config";
import {HistorialTrucha} from "./historial_truchas.model";
import {FenotipoTrucha} from "./fenotipo_truchas.model";

export interface TruchaModel extends Sequelize.Model {
    id: number,
    idLote: number,
    qr: string,
    chip: string,
    madre: number,
    estado: string,
    tanque: string,
    genotipada: boolean
    estado_reproductivo: number
    grupo: number
    orden:number

}

export interface NewTruchaModel {
    id?: number,
    idLote: number,
    qr: string,
    chip: string,
    tanque: string,
    madre?: number,
    estado?: string,
    genotipada?: boolean
    estado_reproductivo?: number
    grupo?: number
    orden?: number

}

export const Trucha = mysql.define<TruchaModel, NewTruchaModel>('truchas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idLote: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    qr: {type: Sequelize.STRING, unique: true},
    tanque: Sequelize.STRING,
    chip: Sequelize.STRING,
    madre: {type: Sequelize.INTEGER, allowNull: true},
    estado: {type: Sequelize.STRING, allowNull: true, defaultValue: 'VIVA'},
    genotipada: {type: Sequelize.BOOLEAN, defaultValue: false},
    estado_reproductivo: {type: Sequelize.INTEGER, defaultValue: 0},
    grupo: {type: Sequelize.INTEGER, defaultValue: 0},
    orden: {type: Sequelize.INTEGER, defaultValue: 0}

}, {underscored: true, timestamps: true})


Trucha.hasMany(HistorialTrucha, {foreignKey: 'id'})
Trucha.hasOne(FenotipoTrucha, {foreignKey: 'id'})
