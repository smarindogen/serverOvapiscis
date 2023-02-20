import express from "express";
import {LotesService} from "../services/lotes.service";
import {Lote, LoteModel, NewLoteModel} from "../database/entities/lote.model";

const service = new LotesService();

export async function findAll(_: express.Request, res: express.Response) {
    service.findAll().then((lotes) => {
        return res.json({lotes})
    }).catch()
}

export async function findLotes(req: express.Request, res: express.Response) {
    let familia=req.query.familia
    if(familia!="familia"){familia="'"+familia+"'"}
    let generacion =req.query.generacion
    let linea = req.query.linea
    if(linea!="linea"){linea="'"+linea+"'"}
    let sexo =req.query.sexo
    if(sexo!="sexo"){sexo="'"+sexo+"'"}

    console.log(req.query)
    service.findLotes(familia,generacion,linea, sexo)
        .then((data) => {
            res.json({lotes: data})
        })
        .catch((err: any) => {
            if (err.msg !== undefined) {
                return res.status(400).json({msg: err.msg})
            }
            return res.status(500).json({msg: "Error al buscar los lotes", err})
        })

}

export async function save(req: express.Request, res: express.Response) {
    const lote: NewLoteModel = req.body
    service.save(lote)
        .then((lote: LoteModel) => {
            return res.json({
                msg: 'Lote creado correctamente',
                lote
            })
        })
        .catch((err: Error) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    msg: 'El lote especificado ya existe'
                })
            }
            return res.status(500).json({
                msg: 'Error al crear el lote',
                name: err.name,
                message: err.message
            })
        })

}

export async function update(req: express.Request, res: express.Response) {
    const lote: LoteModel = req.body
    service.update(lote)
        .then((data) => {
            return res.json({msg: 'Lote actualizado correctamente'})
        })
        .catch()
}

