import {TruchaModel} from "./database/entities/trucha.model";
import util from "util";
import * as fs from "fs";
import ExcelJS from 'exceljs'




export async function listaTruchas(data:object[]){
    const wb = new ExcelJS.Workbook();
    var ws = wb.addWorksheet('Truchas');
    var titulos:string[]=['LOTE','ID','QR','CHIP','ESTADO','ESTADO REPRODUCTIVO','ACT. ESTADO','PESO','TALLA','GENOTIPADA','GRUPO','ORDEN']
    var row =ws.getRow(1)
    titulos.forEach((value, index) => {
        row.getCell((index+1)).value=value
    })
    data.forEach((value,index)=>{
        var row= ws.getRow(index+2)
        // @ts-ignore
        switch (value.estado_reproductivo){
            case 0:
                // @ts-ignore
                value.estado_reproductivo=' '
                break;
            case 1:
                // @ts-ignore
                value.estado_reproductivo='blanca'
                break;
            case 2:
                // @ts-ignore
                value.estado_reproductivo='madura'
                break;
            case 3:
                // @ts-ignore
                value.estado_reproductivo='verde'
                break;
        }
        // @ts-ignore
        if(value.genotipada==1){
            // @ts-ignore
            value.genotipada='Sí'
        } else { // @ts-ignore
            value.genotipada='No'}

        // @ts-ignore
        row.getCell(1).value= value.lote
        // @ts-ignore
        row.getCell(2).value= value.id
        // @ts-ignore
        row.getCell(3).value=check(value.qr)
        // @ts-ignore
        row.getCell(4).value= check(value.chip)
        // @ts-ignore
        row.getCell(5).value= value.estado.toString()
        // @ts-ignore
        row.getCell(6).value=value.estado_reproductivo
        // @ts-ignore
        row.getCell(7).value = new Date(value.fecha)
        // @ts-ignore
        row.getCell(8).value= check(value.peso)
        // @ts-ignore
        row.getCell(9).value=check(value.mida)
        // @ts-ignore
        row.getCell(10).value=check(value.genotipada)
        // @ts-ignore
        row.getCell(11).value=check(value.grupo)
        // @ts-ignore
        row.getCell(12).value=check(value.orden)
    })
    await wb.xlsx.writeFile('Truchas.xlsx')

}

function check(x:any):string {
    let cosa = x
    if (x == null) {
        cosa =""
    }

    if (x === null) {
        cosa=""
    }

    if (typeof x === 'undefined') {
       cosa=""
    }
    return cosa.toString()
}

