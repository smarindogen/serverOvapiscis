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
exports.listaTruchas = void 0;
function listaTruchas(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var xl = require('excel4node');
        var wb = new xl.Workbook();
        var ws = wb.addWorksheet('Truchas');
        var titulos = ['LOTE', 'ID', 'QR', 'CHIP', 'ESTADO', 'ESTADO REPRODUCTIVO', 'ACT. ESTADO', 'PESO', 'TALLA', 'GENOTIPADA', 'GRUPO', 'ORDEN'];
        titulos.forEach((value, index) => {
            ws.cell(1, (index + 1)).string(value);
        });
        data.forEach((value, index) => {
            // @ts-ignore
            switch (value.estado_reproductivo) {
                case 0:
                    // @ts-ignore
                    value.estado_reproductivo = ' ';
                    break;
                case 1:
                    // @ts-ignore
                    value.estado_reproductivo = 'blanca';
                    break;
                case 2:
                    // @ts-ignore
                    value.estado_reproductivo = 'madura';
                    break;
                case 3:
                    // @ts-ignore
                    value.estado_reproductivo = 'verde';
                    break;
            }
            // @ts-ignore
            if (value.genotipada == 1) {
                // @ts-ignore
                value.genotipada = 'Sí';
            }
            else { // @ts-ignore
                value.genotipada = 'No';
            }
            // @ts-ignore
            ws.cell(index + 2, 1).string(value.lote);
            // @ts-ignore
            ws.cell(index + 2, 2).number(value.id);
            // @ts-ignore
            ws.cell(index + 2, 3).string(check(value.qr));
            // @ts-ignore
            ws.cell(index + 2, 4).string(check(value.chip));
            // @ts-ignore
            ws.cell(index + 2, 5).string(value.estado.toString());
            // @ts-ignore
            ws.cell(index + 2, 6).string(value.estado_reproductivo);
            // @ts-ignore
            ws.cell(index + 2, 7).date(new Date(value.fecha));
            // @ts-ignore
            ws.cell(index + 2, 8).string(check(value.peso));
            // @ts-ignore
            ws.cell(index + 2, 9).string(check(value.mida));
            // @ts-ignore
            ws.cell(index + 2, 10).string(check(value.genotipada));
            // @ts-ignore
            ws.cell(index + 2, 11).string(check(value.grupo));
            // @ts-ignore
            ws.cell(index + 2, 12).string(check(value.orden));
        });
        wb.write('Truchas.xlsx');
        yield delay(1000);
    });
}
exports.listaTruchas = listaTruchas;
function check(x) {
    let cosa = x;
    if (x == null) {
        cosa = "";
    }
    if (x === null) {
        cosa = "";
    }
    if (typeof x === 'undefined') {
        cosa = "";
    }
    return cosa.toString();
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
