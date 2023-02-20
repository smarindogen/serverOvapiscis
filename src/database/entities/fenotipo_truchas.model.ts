import * as Sequelize from "sequelize";
import {mysql} from "../mysql.config";
import {Trucha} from "./trucha.model";

export interface FenotipoTruchaModel extends Sequelize.Model {
    id: number,
    pesoAntes: number,
    pesoDespues: number,
    pesoOvas: number
}

export interface NewFenotipoTruchaModel {
    id: number,
    pesoAntes: number,
    pesoDespues: number,
    pesoOvas: number

}

export const FenotipoTrucha = mysql.define<FenotipoTruchaModel, NewFenotipoTruchaModel>('fenotipo_truchas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    pesoAntes: Sequelize.FLOAT,
    pesoDespues: Sequelize.FLOAT,
    pesoOvas: Sequelize.FLOAT,

}, {underscored: true, timestamps: true})
