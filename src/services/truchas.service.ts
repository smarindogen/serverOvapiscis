import {NewTruchaModel, Trucha, TruchaModel} from "../database/entities/trucha.model";
import {HistorialTrucha, NewHistorialTruchaModel} from "../database/entities/historial_truchas.model";
import dateFormat from "dateformat"
import {mysql} from "../database/mysql.config";
import {QueryTypes} from "sequelize";
import {FenotipoTrucha, NewFenotipoTruchaModel} from "../database/entities/fenotipo_truchas.model";

export class TruchasService {
    save(trucha: NewTruchaModel): Promise<{ msg: string } | TruchaModel> {
        return new Promise((resolve, reject) => {
            Trucha.findAll({
                where: {
                    chip: trucha.chip
                }
            }).then((truchas: TruchaModel[]) => {
                if (truchas.length == 0) {
                    // @ts-ignore
                    return resolve(Trucha.create(trucha))
                } else {
                    if (truchas.pop()?.estado === 'VIVA') {
                        return reject({msg: "El chip está en uso"})
                    } else {
                        // @ts-ignore
                        return resolve(Trucha.create(trucha))
                    }
                }
            })
        })
    }
    delete(id:number): Promise<{ msg: string }> {
        return new Promise((resolve, reject) => {
            Trucha.destroy({
                where: {
                    id: id

                }

            }).then(()=>
                HistorialTrucha.destroy( {
                where:{
                    id: id
                }
            }).then(()=>
                    FenotipoTrucha.destroy({
                where:{
                    id: id
                }

            })))
            return resolve({msg:"Trucha eliminada correctamente"})
        })
    }


    findAll() {
        return mysql.query("select CONCAT('OV', l.familia, '.', l.generacion, '.', l.linea, '.', l.grupo, '.', l.sexo) as lote," +
            " t.tanque," +
            " t.chip," +
            " t.qr," +
            " t.id," +
            " t.estado," +
            " t.genotipada, " +
            " t.estado_reproductivo, " +
            " (SELECT mida" +
            " from historial_truchas ht" +
            " where ht.id = t.id" +
            " order by fecha desc" +
            " limit 1) as mida," +
            " (SELECT peso" +
            " from historial_truchas ht" +
            " where ht.id = t.id" +
            " order by fecha desc" +
            " limit 1) as peso" +
            " from truchas t INNER JOIN lotes l on t.id_lote = l.id" +
            " order by t.id", {type: QueryTypes.SELECT})
    }

    findLast() {
        return mysql.query("select CONCAT('OV', l.familia, '.', l.generacion, '.', l.linea, '.', l.grupo, '.', l.sexo) as lote," +
            " t.tanque," +
            " t.chip," +
            " t.qr," +
            " t.id," +
            " t.estado," +
            " t.genotipada, " +
            " t.estado_reproductivo, " +
            " t.grupo," +
            " t.orden," +
            " (SELECT mida" +
            " from historial_truchas ht" +
            " where ht.id = t.id" +
            " order by fecha desc" +
            " limit 1) as mida," +
            " (SELECT peso" +
            " from historial_truchas ht" +
            " where ht.id = t.id" +
            " order by fecha desc" +
            " limit 1) as peso" +
            " from truchas t INNER JOIN lotes l on t.id_lote = l.id" +
            " order by t.id desc limit 5", {type: QueryTypes.SELECT})
    }

    addMedicion(id: number, peso: any, mida: any) {
        var now = new Date();
        dateFormat(now, "dd/MM/yyyy hh:mm");

        const medicion: NewHistorialTruchaModel = {
            id,
            fecha: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0, 0),
            peso,
            mida
        }
        // @ts-ignore
        return HistorialTrucha.create(medicion)
    }
    addFenotipo(id: number, pesoAntes: any, pesoDespues: any, pesoOvas:any) {

        const medicion: NewFenotipoTruchaModel = {
            id,
            pesoAntes,
            pesoDespues,
            pesoOvas
        }
        // @ts-ignore
        return FenotipoTrucha.create(medicion)
    }
    updateFenotipo(id: number, pesoAntes: any, pesoDespues: any, pesoOvas: any) {
        console.log(id,pesoAntes,pesoDespues,pesoOvas)
        return FenotipoTrucha.update({pesoAntes,pesoDespues,pesoOvas}, {where: {id}})

    }

    findAllByDevice(device: string, id: string) {
        return mysql.query("select t.id, " +
            "t.id_lote as idLote, " +
            "CONCAT('OV', l.familia, '.', l.generacion, '.', l.linea, '.', l.grupo, '.', l.sexo)    as lote, " +
            "t.tanque, " +
            "t.chip, " +
            "t.qr, " +
            "t.estado, " +
            " t.genotipada, " +
            " t.estado_reproductivo, " +
            " t.grupo," +
            "t.orden," +
            "(SELECT mida from historial_truchas ht where ht.id = t.id order by fecha desc limit 1) as mida, " +
            "(SELECT peso from historial_truchas ht where ht.id = t.id order by fecha desc limit 1) as peso, " +
            "(SELECT peso_antes from fenotipo_truchas ft where ft.id = t.id) as pesoAntes, " +
            "(SELECT peso_despues from fenotipo_truchas ft where ft.id = t.id) as pesoDespues, " +
            "(SELECT peso_ovas from fenotipo_truchas ft where ft.id = t.id) as pesoOvas " +
            "from truchas t INNER JOIN lotes l on t.id_lote = l.id " +
            "where " + device + " = '" + id + "'" +
            "order by t.id", {type: QueryTypes.SELECT})
    }

    muerta(id: number) {
        return Trucha.update({estado: "MUERTA"}, {where: {id}})

    }


    findAllByLote(ids: number[]) {
        return mysql.query(
            "select " +
            "CONCAT('OV', l.familia, '.', l.generacion, '.', l.linea, '.', l.grupo, '.', l.sexo)    as lote, " +
            "t.id, " +
            "t.id_lote as idLote, " +
            "t.chip, " +
            "t.qr, " +
            "t.tanque, " +
            "t.estado, " +
            " t.genotipada, " +
            " t.estado_reproductivo, " +
            " t.grupo," +
            "t.orden," +
            "(SELECT fecha from historial_truchas ht where ht.id = t.id order by fecha desc limit 1) as fecha, " +
            "(SELECT mida from historial_truchas ht where ht.id = t.id order by fecha desc limit 1) as mida, " +
            "(SELECT peso from historial_truchas ht where ht.id = t.id order by fecha desc limit 1) as peso " +
            "from truchas t INNER JOIN lotes l on t.id_lote = l.id " +
            "where t.id_lote in (" + ids + ") " +
            "order by t.id desc ",{type: QueryTypes.SELECT})
    }

    update(id: number, chip: any, qr: any, estado: any, idLote: number, tanque: any, peso: number, mida: number, fecha: any, estado_reproductivo:number, orden:number, grupo:number, genotipada:boolean) {
        console.log(orden,grupo)
        return Trucha.update({chip, qr, estado, idLote, tanque, orden, estado_reproductivo,grupo, genotipada}, {where: {id}})
            .then(() => {
                HistorialTrucha.update({peso, mida}, {where: {id, fecha}})
            })
    }

    cambiarEstadoReproductivo(id: number, estado: number) {
        return Trucha.update({estado_reproductivo: estado}, {where: {id}})
    }

    updateExcel(ttl:string,dato:any,ttlwhere:string,where:any){
        return mysql.query(
          "UPDATE truchas SET "
             +ttl+" = "+dato+
            " where "+ttlwhere+" = "+where,{type: QueryTypes.UPDATE})
    }
}
