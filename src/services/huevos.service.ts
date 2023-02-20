
import {mysql} from "../database/mysql.config";
import {QueryTypes} from "sequelize";
import {Huevos, HuevosModel, NewHuevosModel} from "../database/entities/huevos.model";

export class HuevosService {
    save(huevos: NewHuevosModel): Promise<{ msg: string } | HuevosModel> {
        return new Promise((resolve, reject) => {
            Huevos.findAll({
                where: {
                    id: huevos.idMadre
                }
            }).then((huevos: HuevosModel[]) => {
                if (huevos.length == 0) {
                    // @ts-ignore
                    return resolve(Huevos.create(huevos))
                } else {
                    return reject({msg: "Ya existe una puesta con esta madre"})

                }
            })
        })
    }

    findAll() {
        return mysql.query("select" +
            " h.n_puesta," +
            " h.gr_huevas_malas," +
            " h.gr_huevas_buenas," +
            " h.ne," +
            " h.op," +
            " h.tamano_hueva, " +
            " (SELECT qr" +
            " from truchas t" +
            " where t.id = h.id_madre)" +
            " as qrMadre," +
            "(select grupo from truchas t) as grupoPadres," +
            " from huevos h" +
            " order by h.n_puesta", {type: QueryTypes.SELECT})
    }

    update(id: number, idMadre: number, nPuesta: number, grHuevasBuenas: number, grHuevasMalas: number, ne:Number, op: Number, tamanoHueva:Number) {
        console.log(id, idMadre,nPuesta, grHuevasBuenas, grHuevasMalas, ne, op, tamanoHueva)
        return Huevos.update({grHuevasBuenas, grHuevasMalas, ne, op, tamanoHueva}, {where: {id}})

    }
}