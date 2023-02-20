import express, {response} from "express";
import {TruchasService} from "../services/truchas.service";
import {NewTruchaModel, TruchaModel} from "../database/entities/trucha.model";
import {HistorialTruchaModel} from "../database/entities/historial_truchas.model";
import {Lote} from "../database/entities/lote.model";
import {listaTruchas} from "../listatruchas";
import {BOOLEAN} from "sequelize";

const service = new TruchasService()
const delay = (ms: number ) => new Promise(resolve => setTimeout(resolve, ms))
export async function findAll(req: express.Request, res: express.Response) {
    service.findAll()
        .then(truchas => {
            return res.json({truchas})
        })
}

export async function save(req: express.Request, res: express.Response) {
    const {idLote, qr, chip, tanque, peso, mida} = req.body
    const trucha: NewTruchaModel = {
        idLote,
        qr,
        tanque,
        chip
    }
    service.save(trucha)
        .then((response: TruchaModel | { msg: string }) => {
            const newTrucha = response as TruchaModel
            service.addMedicion(newTrucha.id, peso, mida)
                .then((data: HistorialTruchaModel) => {
                    return res.json({
                        msg: "Trucha guardada correctamente",
                        trucha: {
                            id: newTrucha.id,
                            lote: newTrucha.idLote,
                            qr: newTrucha.qr,
                            tanque: newTrucha.tanque,
                            chip: newTrucha.chip,
                            madre: newTrucha.madre,
                            estado: newTrucha.estado,
                            peso: data.peso,
                            mida: data.mida
                        }
                    })
                })
                .catch((err: any) => {
                    if (err.msg !== undefined) {
                        return res.status(400).json({msg: err.msg})
                    }
                    return res.status(500).json({msg: "Error al guardar la trucha", err})
                })
        })
        .catch((err: any) => {
            if (err.msg !== undefined) {
                return res.status(400).json({msg: err.msg})
            }
            return res.status(500).json({msg: "Error al guardar la trucha", err})
        })

}

export async function update(req: express.Request, res: express.Response) {
    let{
        id,
        chip,
        qr,
        estado,
        idLote,
        tanque,
        peso,
        mida,
        fecha,
        estado_reproductivo,
        grupo,
        orden,
        genotipada
    } = req.body
    console.log(req.body)
    service.update(Number(id), chip, qr, estado, Number(idLote), tanque, Number(peso), Number(mida), fecha, Number(estado_reproductivo),  Number(orden),Number(grupo), Boolean(genotipada))
        .then(() => {
            console.log("Actualización realizada")
            return res.json({msg: "Actualización realizada"})
        })
        .catch((err) => {
            res.status(500).json({err})
        })

}

export async function remove(req: express.Request, res: express.Response) {
    const {id} = req.body
    service.delete(id).then((data)=>{
        res.json({data})
    })
}


export async function findAllByDevice(req: express.Request, res: express.Response) {
    const {device, id} = req.params

    service.findAllByDevice(device, id)
        .then((data) => {
            res.json({truchas: data})
        })
        .catch((err: any) => {
            if (err.msg !== undefined) {
                return res.status(400).json({msg: err.msg})
            }
            return res.status(500).json({msg: "Error al buscar la trucha", err})
        })


}

export async function muerta(req: express.Request, res: express.Response) {
    const {id} = req.params
    service.muerta(Number(id))
        .then((data) => {
            const [filas,] = data;
            return res.json({msg: "Trucha actualizada"})
        })
        .catch((err: any) => {
            if (err.msg !== undefined) {
                return res.status(400).json({msg: err.msg})
            }
            return res.status(500).json({msg: "Error al actualizar la trucha", err})
        })
}

export async function findLast(req: express.Request, res: express.Response) {
    service.findLast()
        .then((data) => {
            res.json({truchas: data})
        })
        .catch((err: any) => {
            if (err.msg !== undefined) {
                return res.status(400).json({msg: err.msg})
            }
            return res.status(500).json({msg: "Error al recuperar las truchas", err})
        })

}

export async function findAllByLotes(req: express.Request, res: express.Response) {
    const param = req.params.ids
    const ids = param.split(',').map(x => +x)
    service.findAllByLote(ids)
        .then(data => {
            res.send(data)
        })
}

export async function downloadTruchas(req: express.Request, res: express.Response) {
    const param = req.params.ids
    const ids = param.split(',').map(x => +x)
    service.findAllByLote(ids)
        .then(data => {
            listaTruchas(data).then(async ()=>{
                await delay(1000) /// waiting 1 second.
                res.download('./Truchas.xlsx',(err)=>{

                    if (err) {
                        res.send({
                            error : err,
                            msg   : "Problem downloading the file"
                        })
                    }
                }
            )
        })
})
}



export async function nuevaMedicion(req: express.Request, res: express.Response) {
    const {id, peso, mida} = req.body
    service.addMedicion(id, peso, mida)
        .then(() => res.json({msg: "Nuevos datos guardados"}))
        .catch((err: any) => {
            if (err.msg !== undefined) {
                return res.status(400).json({msg: err.msg})
            }
            return res.status(500).json({msg: "Error al insertar nuevos datos", err})
        })
}
export async function nuevoFenotipo(req: express.Request, res: express.Response) {
    const {id, pesoAntes, pesoDespues, pesoOvas} = req.body
    service.addFenotipo(id, pesoAntes, pesoDespues, pesoOvas)
        .then(() => res.json({msg: "Nuevos datos guardados"}))
        .catch((err: any) => {
            if (err.msg !== undefined) {
                return res.status(400).json({msg: err.msg})
            }
            return res.status(500).json({msg: "Error al insertar nuevos datos", err})
        })
}
export async function updateFenotipo(req: express.Request, res: express.Response) {
    const {id} = req.params
    const {
        pesoAntes,
        pesoDespues,
        pesoOvas
    } = req.body

    service.updateFenotipo(Number(id), Number(pesoAntes), Number(pesoDespues), Number(pesoOvas))
        .then(() => {
            return res.json({msg: "Actualización realizada???"})
        })
        .catch((err) => {
            res.status(500).json({err})
        })

}
export async function cambiarEstadoReproductivo(req: express.Request, res: express.Response) {
    const {id} = req.params
    const {estado} = req.body
    console.log(estado);
    console.log(id);
    service.cambiarEstadoReproductivo(Number(id),estado)
        .then(() => res.json({msg: "Estado reproductivo actualizado"}))
        .catch((err: any) => {
            if (err.msg !== undefined) {
                return res.status(400).json({msg: err.msg})
            }
            return res.status(500).json({msg: "Error al insertar nuevos datos", err})
        })
}