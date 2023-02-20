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
exports.avgLotesMida = exports.avgLotesPeso = exports.countLote = exports.countTanque = void 0;
const stats_service_1 = require("../services/stats.service");
const service = new stats_service_1.StatsService();
function countTanque(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        service.countTanque().then((data) => {
            res.json({ tanques: data });
        });
    });
}
exports.countTanque = countTanque;
function countLote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        service.countLote().then((data) => {
            res.json({ lotes: data });
        });
    });
}
exports.countLote = countLote;
function avgLotesPeso(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        service.avgLotesPeso().then((data) => {
            res.json({ lotes: data });
        });
    });
}
exports.avgLotesPeso = avgLotesPeso;
function avgLotesMida(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        service.avgLotesMida().then((data) => {
            res.json({ lotes: data });
        });
    });
}
exports.avgLotesMida = avgLotesMida;
