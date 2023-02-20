import express from "express";
import Excel from 'exceljs'
import {TruchasService} from "../services/truchas.service";

const service = new TruchasService()
export async function save(req:express.Request, res: express.Response) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    let file = req.files.thumbnail;
    console.log(file)
    // @ts-ignore
    console.log("File uploaded: ", file.name)

    const workbook = new Excel.Workbook();
    // @ts-ignore
    await workbook.xlsx.readFile(file.tempFilePath).then((wb)=>{
        let ws = wb.getWorksheet(1)
        // @ts-ignore
        if(file.name == "genotipada"){
            let qr:any = 1
            let i=1
            while(qr!=null){
                var row= ws.getRow(i+1)
                qr= row.getCell(1).value
                i++
                service.updateExcel("genotipada",true,"qr",qr)
            }
        }


    })
    return res.json({msg: "todo correcto"})

}