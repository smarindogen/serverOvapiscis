"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotesService = void 0;
const lote_model_1 = require("../database/entities/lote.model");
const sequelize_1 = require("sequelize");
const mysql_config_1 = require("../database/mysql.config");
class LotesService {
    findAll() {
        return lote_model_1.Lote.findAll();
    }
    save(lote) {
        // @ts-ignore
        return lote_model_1.Lote.create(lote);
    }
    update(lote) {
        return lote_model_1.Lote.update(lote, { where: { id: lote.id } });
    }
    remove(id) {
        return lote_model_1.Lote.destroy({ where: { id } });
    }
    findLotes(familia, generacion, linea, sexo) {
        return mysql_config_1.mysql.query("select *" +
            "from lotes " +
            "where familia= " + familia + "" +
            " and generacion= " + generacion + "" +
            " and linea= " + linea + "" +
            " and sexo= " + sexo + "" +
            " order by id", { type: sequelize_1.QueryTypes.SELECT });
    }
}
exports.LotesService = LotesService;
