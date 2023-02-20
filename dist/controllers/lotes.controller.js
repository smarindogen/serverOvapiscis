"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.save = exports.findLotes = exports.findAll = void 0;
const lotes_service_1 = require("../services/lotes.service");
const service = new lotes_service_1.LotesService();
function findAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        service.findAll().then((lotes) => {
            return res.json({ lotes });
        }).catch();
    });
}
exports.findAll = findAll;
function findLotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let familia = req.query.familia;
        if (familia != "familia") {
            familia = "'" + familia + "'";
        }
        let generacion = req.query.generacion;
        let linea = req.query.linea;
        if (linea != "linea") {
            linea = "'" + linea + "'";
        }
        let sexo = req.query.sexo;
        if (sexo != "sexo") {
            sexo = "'" + sexo + "'";
        }
        console.log(req.query);
        service.findLotes(familia, generacion, linea, sexo)
            .then((data) => {
            res.json({ lotes: data });
        })
            .catch((err) => {
            if (err.msg !== undefined) {
                return res.status(400).json({ msg: err.msg });
            }
            return res.status(500).json({ msg: "Error al buscar los lotes", err });
        });
    });
}
exports.findLotes = findLotes;
function save(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lote = req.body;
        service.save(lote)
            .then((lote) => {
            return res.json({
                msg: 'Lote creado correctamente',
                lote
            });
        })
            .catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    msg: 'El lote especificado ya existe'
                });
            }
            return res.status(500).json({
                msg: 'Error al crear el lote',
                name: err.name,
                message: err.message
            });
        });
    });
}
exports.save = save;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const lote = req.body;
        service.update(lote)
            .then((data) => {
            return res.json({ msg: 'Lote actualizado correctamente' });
        })
            .catch();
    });
}
exports.update = update;
