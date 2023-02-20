import express from "express";
import {StatsService} from "../services/stats.service";

const service = new StatsService()

export async function countTanque(req: express.Request, res: express.Response) {
    service.countTanque().then((data) => {
        res.json({tanques: data})
    })
}

export async function countLote(req: express.Request, res: express.Response) {
    service.countLote().then((data) => {
        res.json({lotes: data})
    })
}

export async function avgLotesPeso(req: express.Request, res: express.Response) {
    service.avgLotesPeso().then((data)=>{
        res.json({lotes:data})
    })
}
export async function avgLotesMida(req: express.Request, res: express.Response) {
    service.avgLotesMida().then((data)=>{
        res.json({lotes:data})
    })
}
