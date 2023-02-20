import * as Sequelize from "sequelize";
import {mysql} from "../mysql.config";

import {Trucha} from "./trucha.model";

export interface LoteModel extends Sequelize.Model {
    id: number,
    familia: string,
    generacion: number,
    linea: string,
    grupo: string,
    sexo: string

}

export interface NewLoteModel {
    id?: number,
    familia: string,
    generacion: number,
    linea: string,
    grupo: string,
    sexo: string

}

export const Lote = mysql.define<LoteModel, NewLoteModel>('lotes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    familia: {type: Sequelize.STRING},
    generacion: {type: Sequelize.INTEGER},
    linea: {type: Sequelize.STRING},
    grupo: {type: Sequelize.STRING(10)},
    sexo: {type: Sequelize.STRING(3)}

}, {
    indexes: [{
        unique: true,
        fields: ['familia', 'generacion', 'linea', 'grupo', 'sexo']
    }
    ],
    underscored: true,
    timestamps: true
})

Lote.hasMany(Trucha, {foreignKey:'id_lote'})
