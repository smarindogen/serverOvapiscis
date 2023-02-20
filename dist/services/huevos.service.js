"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HuevosService = void 0;
const mysql_config_1 = require("../database/mysql.config");
const sequelize_1 = require("sequelize");
const huevos_model_1 = require("../database/entities/huevos.model");
class HuevosService {
    save(huevos) {
        return new Promise((resolve, reject) => {
            huevos_model_1.Huevos.findAll({
                where: {
                    id: huevos.idMadre
                }
            }).then((huevos) => {
                if (huevos.length == 0) {
                    // @ts-ignore
                    return resolve(huevos_model_1.Huevos.create(huevos));
                }
                else {
                    return reject({ msg: "Ya existe una puesta con esta madre" });
                }
            });
        });
    }
    findAll() {
        return mysql_config_1.mysql.query("select" +
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
            " order by h.n_puesta", { type: sequelize_1.QueryTypes.SELECT });
    }
    update(id, idMadre, nPuesta, grHuevasBuenas, grHuevasMalas, ne, op, tamanoHueva) {
        console.log(id, idMadre, nPuesta, grHuevasBuenas, grHuevasMalas, ne, op, tamanoHueva);
        return huevos_model_1.Huevos.update({ grHuevasBuenas, grHuevasMalas, ne, op, tamanoHueva }, { where: { id } });
    }
}
exports.HuevosService = HuevosService;
