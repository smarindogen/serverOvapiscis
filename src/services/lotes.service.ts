import {Lote, LoteModel, NewLoteModel} from "../database/entities/lote.model";
import {QueryTypes, where} from "sequelize";
import {mysql} from "../database/mysql.config";

export class LotesService {
    findAll() {
        return Lote.findAll()
    }

    save(lote: NewLoteModel) {
        // @ts-ignore
        return Lote.create(lote)
    }

    update(lote: LoteModel) {
        return Lote.update(lote, {where: {id: lote.id}})
    }

    remove(id: number) {
        return Lote.destroy({where: {id}})
    }
    findLotes(familia: any, generacion: any, linea:any, sexo:any) {
        return mysql.query("select *"+
            "from lotes " +
            "where familia= " + familia + "" +
            " and generacion= " + generacion + "" +
            " and linea= " + linea + "" +
            " and sexo= " + sexo + "" +
            " order by id", {type: QueryTypes.SELECT})
    }

}
