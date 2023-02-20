import express from "express";
import {TruchasService} from "../services/truchas.service";
import {HuevosService} from "../services/huevos.service";
import {HuevosModel, NewHuevosModel} from "../database/entities/huevos.model";
import {TruchaModel} from "../database/entities/trucha.model";

const service = new HuevosService()

export async function findAll(req: express.Request, res: express.Response) {
    service.findAll()
        .then(truchas => {
            return res.json({truchas})
        })
}

export async function save(req: express.Request, res: express.Response) {
    const {idMadre, nPuesta, grHuevasBuenas, grHuevasMalas, ne, op, tamanoHueva} = req.body
    const huevos: NewHuevosModel = {
        idMadre,
        nPuesta,
        grHuevasBuenas,
        grHuevasMalas,
        ne,
        op,
        tamanoHueva
    }
    service.save(huevos)
        .then((response: HuevosModel | { msg: string }) => {
            const newHuevos = response as HuevosModel
                    return res.json({
                        msg: "huevas guardadas correctamente",
                        trucha: {
                            id: newHuevos.id,
                            idMadre: newHuevos.idMadre,
                            nPuesta: newHuevos.nPuesta,
                            grHuevasBuenas: newHuevos.grHuevasBuenas,
                            grHuevasMalas: newHuevos.grHuevasMalas,
                            ne: newHuevos.ne,
                            op: newHuevos.op,
                            tamanoHueva: newHuevos.tamanoHueva,
                        }
                    })
                })
                .catch((err: any) => {
                    if (err.msg !== undefined) {
                        return res.status(400).json({msg: err.msg})
                    }
                    return res.status(500).json({msg: "Error al guardar las huevas", err})
                })
}

export async function update(req: express.Request, res: express.Response) {
    const {
        id,
        idMadre,
        nPuesta,
        grHuevasBuenas,
        grHuevasMalas,
        ne,
        op,
        tamanoHueva
    } = req.body

    service.update(Number(id), Number(idMadre), Number(nPuesta), Number(grHuevasBuenas), Number(grHuevasMalas), Number(ne), Number(op), Number(tamanoHueva))
        .then(() => {
            return res.json({msg: "Actualización realizada"})
        })
        .catch((err) => {
            res.status(500).json({err})
        })

}