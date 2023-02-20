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
exports.cambiarEstadoReproductivo = exports.updateFenotipo = exports.nuevoFenotipo = exports.nuevaMedicion = exports.downloadTruchas = exports.findAllByLotes = exports.findLast = exports.muerta = exports.findAllByDevice = exports.remove = exports.update = exports.save = exports.findAll = void 0;
const truchas_service_1 = require("../services/truchas.service");
const listatruchas_1 = require("../listatruchas");
const service = new truchas_service_1.TruchasService();
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
        const { idLote, qr, chip, tanque, peso, mida } = req.body;
        const trucha = {
            idLote,
            qr,
            tanque,
            chip
        };
        service.save(trucha)
            .then((response) => {
            const newTrucha = response;
            service.addMedicion(newTrucha.id, peso, mida)
                .then((data) => {
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
                });
            })
                .catch((err) => {
                if (err.msg !== undefined) {
                    return res.status(400).json({ msg: err.msg });
                }
                return res.status(500).json({ msg: "Error al guardar la trucha", err });
            });
        })
            .catch((err) => {
            if (err.msg !== undefined) {
                return res.status(400).json({ msg: err.msg });
            }
            return res.status(500).json({ msg: "Error al guardar la trucha", err });
        });
    });
}
exports.save = save;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { id, chip, qr, estado, idLote, tanque, peso, mida, fecha, estado_reproductivo, grupo, orden, genotipada } = req.body;
        console.log(req.body);
        service.update(Number(id), chip, qr, estado, Number(idLote), tanque, Number(peso), Number(mida), fecha, Number(estado_reproductivo), Number(orden), Number(grupo), Boolean(genotipada))
            .then(() => {
            console.log("Actualización realizada");
            return res.json({ msg: "Actualización realizada" });
        })
            .catch((err) => {
            res.status(500).json({ err });
        });
    });
}
exports.update = update;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.remove = remove;
function findAllByDevice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { device, id } = req.params;
        service.findAllByDevice(device, id)
            .then((data) => {
            res.json({ truchas: data });
        })
            .catch((err) => {
            if (err.msg !== undefined) {
                return res.status(400).json({ msg: err.msg });
            }
            return res.status(500).json({ msg: "Error al buscar la trucha", err });
        });
    });
}
exports.findAllByDevice = findAllByDevice;
function muerta(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        service.muerta(Number(id))
            .then((data) => {
            const [filas,] = data;
            return res.json({ msg: "Trucha actualizada" });
        })
            .catch((err) => {
            if (err.msg !== undefined) {
                return res.status(400).json({ msg: err.msg });
            }
            return res.status(500).json({ msg: "Error al actualizar la trucha", err });
        });
    });
}
exports.muerta = muerta;
function findLast(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        service.findLast()
            .then((data) => {
            res.json({ truchas: data });
        })
            .catch((err) => {
            if (err.msg !== undefined) {
                return res.status(400).json({ msg: err.msg });
            }
            return res.status(500).json({ msg: "Error al recuperar las truchas", err });
        });
    });
}
exports.findLast = findLast;
function findAllByLotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const param = req.params.ids;
        const ids = param.split(',').map(x => +x);
        service.findAllByLote(ids)
            .then(data => {
            res.send(data);
        });
    });
}
exports.findAllByLotes = findAllByLotes;
function downloadTruchas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const param = req.params.ids;
        const ids = param.split(',').map(x => +x);
        service.findAllByLote(ids)
            .then(data => {
            listatruchas_1.listaTruchas(data).then(data => {
                res.download('./Truchas.xlsx', (err) => {
                    if (err) {
                        res.send({
                            error: err,
                            msg: "Problem downloading the file"
                        });
                    }
                });
            });
        });
    });
}
exports.downloadTruchas = downloadTruchas;
function nuevaMedicion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, peso, mida } = req.body;
        service.addMedicion(id, peso, mida)
            .then(() => res.json({ msg: "Nuevos datos guardados" }))
            .catch((err) => {
            if (err.msg !== undefined) {
                return res.status(400).json({ msg: err.msg });
            }
            return res.status(500).json({ msg: "Error al insertar nuevos datos", err });
        });
    });
}
exports.nuevaMedicion = nuevaMedicion;
function nuevoFenotipo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, pesoAntes, pesoDespues, pesoOvas } = req.body;
        service.addFenotipo(id, pesoAntes, pesoDespues, pesoOvas)
            .then(() => res.json({ msg: "Nuevos datos guardados" }))
            .catch((err) => {
            if (err.msg !== undefined) {
                return res.status(400).json({ msg: err.msg });
            }
            return res.status(500).json({ msg: "Error al insertar nuevos datos", err });
        });
    });
}
exports.nuevoFenotipo = nuevoFenotipo;
function updateFenotipo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { pesoAntes, pesoDespues, pesoOvas } = req.body;
        service.updateFenotipo(Number(id), Number(pesoAntes), Number(pesoDespues), Number(pesoOvas))
            .then(() => {
            return res.json({ msg: "Actualización realizada???" });
        })
            .catch((err) => {
            res.status(500).json({ err });
        });
    });
}
exports.updateFenotipo = updateFenotipo;
function cambiarEstadoReproductivo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { estado } = req.body;
        console.log(estado);
        console.log(id);
        service.cambiarEstadoReproductivo(Number(id), estado)
            .then(() => res.json({ msg: "Estado reproductivo actualizado" }))
            .catch((err) => {
            if (err.msg !== undefined) {
                return res.status(400).json({ msg: err.msg });
            }
            return res.status(500).json({ msg: "Error al insertar nuevos datos", err });
        });
    });
}
exports.cambiarEstadoReproductivo = cambiarEstadoReproductivo;
