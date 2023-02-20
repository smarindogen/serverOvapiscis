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
exports.update = exports.save = exports.findAll = void 0;
const huevos_service_1 = require("../services/huevos.service");
const service = new huevos_service_1.HuevosService();
function findAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        service.findAll()
            .then(truchas => {
            return res.json({ truchas });
        });
    });
}
exports.findAll = findAll;
function save(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { idMadre, nPuesta, grHuevasBuenas, grHuevasMalas, ne, op, tamanoHueva } = req.body;
        const huevos = {
            idMadre,
            nPuesta,
            grHuevasBuenas,
            grHuevasMalas,
            ne,
            op,
            tamanoHueva
        };
        service.save(huevos)
            .then((response) => {
            const newHuevos = response;
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
            });
        })
            .catch((err) => {
            if (err.msg !== undefined) {
                return res.status(400).json({ msg: err.msg });
            }
            return res.status(500).json({ msg: "Error al guardar las huevas", err });
        });
    });
}
exports.save = save;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, idMadre, nPuesta, grHuevasBuenas, grHuevasMalas, ne, op, tamanoHueva } = req.body;
        service.update(Number(id), Number(idMadre), Number(nPuesta), Number(grHuevasBuenas), Number(grHuevasMalas), Number(ne), Number(op), Number(tamanoHueva))
            .then(() => {
            return res.json({ msg: "Actualización realizada" });
        })
            .catch((err) => {
            res.status(500).json({ err });
        });
    });
}
exports.update = update;
