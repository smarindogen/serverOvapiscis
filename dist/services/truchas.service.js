"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruchasService = void 0;
const trucha_model_1 = require("../database/entities/trucha.model");
const historial_truchas_model_1 = require("../database/entities/historial_truchas.model");
const dateformat_1 = __importDefault(require("dateformat"));
const mysql_config_1 = require("../database/mysql.config");
const sequelize_1 = require("sequelize");
const fenotipo_truchas_model_1 = require("../database/entities/fenotipo_truchas.model");
class TruchasService {
    save(trucha) {
        return new Promise((resolve, reject) => {
            trucha_model_1.Trucha.findAll({
                where: {
                    chip: trucha.chip
                }
            }).then((truchas) => {
                var _a;
                if (truchas.length == 0) {
                    // @ts-ignore
                    return resolve(trucha_model_1.Trucha.create(trucha));
                }
                else {
                    if (((_a = truchas.pop()) === null || _a === void 0 ? void 0 : _a.estado) === 'VIVA') {
                        return reject({ msg: "El chip está en uso" });
                    }
                    else {
                        // @ts-ignore
                        return resolve(trucha_model_1.Trucha.create(trucha));
                    }
                }
            });
        });
    }
    findAll() {
        return mysql_config_1.mysql.query("select CONCAT('OV', l.familia, '.', l.generacion, '.', l.linea, '.', l.grupo, '.', l.sexo) as lote," +
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
            " order by t.id", { type: sequelize_1.QueryTypes.SELECT });
    }
    findLast() {
        return mysql_config_1.mysql.query("select CONCAT('OV', l.familia, '.', l.generacion, '.', l.linea, '.', l.grupo, '.', l.sexo) as lote," +
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
            " order by t.id desc limit 5", { type: sequelize_1.QueryTypes.SELECT });
    }
    addMedicion(id, peso, mida) {
        var now = new Date();
        dateformat_1.default(now, "dd/MM/yyyy hh:mm");
        const medicion = {
            id,
            fecha: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0, 0),
            peso,
            mida
        };
        // @ts-ignore
        return historial_truchas_model_1.HistorialTrucha.create(medicion);
    }
    addFenotipo(id, pesoAntes, pesoDespues, pesoOvas) {
        const medicion = {
            id,
            pesoAntes,
            pesoDespues,
            pesoOvas
        };
        // @ts-ignore
        return fenotipo_truchas_model_1.FenotipoTrucha.create(medicion);
    }
    updateFenotipo(id, pesoAntes, pesoDespues, pesoOvas) {
        console.log(id, pesoAntes, pesoDespues, pesoOvas);
        return fenotipo_truchas_model_1.FenotipoTrucha.update({ pesoAntes, pesoDespues, pesoOvas }, { where: { id } });
    }
    findAllByDevice(device, id) {
        return mysql_config_1.mysql.query("select t.id, " +
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
            "order by t.id", { type: sequelize_1.QueryTypes.SELECT });
    }
    muerta(id) {
        return trucha_model_1.Trucha.update({ estado: "MUERTA" }, { where: { id } });
    }
    findAllByLote(ids) {
        return mysql_config_1.mysql.query("select " +
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
            "order by t.id desc ", { type: sequelize_1.QueryTypes.SELECT });
    }
    update(id, chip, qr, estado, idLote, tanque, peso, mida, fecha, estado_reproductivo, orden, grupo, genotipada) {
        console.log(orden, grupo);
        return trucha_model_1.Trucha.update({ chip, qr, estado, idLote, tanque, orden, estado_reproductivo, grupo, genotipada }, { where: { id } })
            .then(() => {
            historial_truchas_model_1.HistorialTrucha.update({ peso, mida }, { where: { id, fecha } });
        });
    }
    cambiarEstadoReproductivo(id, estado) {
        return trucha_model_1.Trucha.update({ estado_reproductivo: estado }, { where: { id } });
    }
}
exports.TruchasService = TruchasService;
