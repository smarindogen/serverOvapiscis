import {mysql} from "../database/mysql.config";
import {QueryTypes} from "sequelize";

export class StatsService {

    countTanque() {
        return mysql.query("select distinct tanque  as tank, " +
            "(select count(*) from truchas t where t.estado = 'VIVA' and t.tanque = tank)   as vivas, " +
            "(select count(*) from truchas t where t.estado = 'MUERTA' and t.tanque = tank) as muertas, " +
            "(select count(*) from truchas t where t.tanque = tank) as total " +
            "from truchas;", {type: QueryTypes.SELECT})
    }

    countLote() {
        return mysql.query("select distinct id_lote as idLote, " +
            " CONCAT('OV', l.familia, '.', l.generacion, '.', l.linea, '.', l.grupo, '.', l.sexo) as lote,"+
            " (select count(*) from truchas t where t.estado = 'VIVA' and t.id_lote = idLote)   as vivas, " +
            " (select count(*) from truchas t where t.estado = 'MUERTA' and t.id_lote = idLote) as muertas, " +
            " (select count(*) from truchas t where t.id_lote = idLote) as total " +
            " from truchas" +
            " inner join lotes l on truchas.id_lote = l.id", {type: QueryTypes.SELECT})
    }
    
    avgLotesPeso(){
        return mysql.query(
            "select distinct id_lote as idLote, " +
            "CONCAT('OV', l.familia, '.', l.generacion, '.', l.linea, '.', l.grupo, '.', l.sexo) as lote, " +
            "COALESCE((select Round(avg(peso),2) " +
            "from truchas t " +
            "inner join historial_truchas ht on t.id = ht.id " +
            "where t.id_lote = idLote and t.estado='VIVA'),0) as avg, " +
            "COALESCE((select Round(max(peso)) " +
            "from truchas t " +
            "inner join historial_truchas ht on t.id = ht.id " +
            " where t.id_lote = idLote and t.estado='VIVA') ,0) as max, " +
            "COALESCE((select Round(min(peso)) " +
            "from truchas t " +
            "inner join historial_truchas ht on t.id = ht.id " +
            " where t.id_lote = idLote and t.estado='VIVA')  ,0) as min " +
            "from truchas " +
            " inner join lotes l on truchas.id_lote = l.id",{type:QueryTypes.SELECT})
    }
    avgLotesMida(){
        return mysql.query(
            "select distinct id_lote as idLote, " +
            "CONCAT('OV', l.familia, '.', l.generacion, '.', l.linea, '.', l.grupo, '.', l.sexo) as lote, " +
            "COALESCE((select Round(avg(mida),2) " +
            "from truchas t " +
            "inner join historial_truchas ht on t.id = ht.id " +
            "where t.id_lote = idLote and t.estado='VIVA'),0) as avg, " +
            "COALESCE((select Round(max(mida)) " +
            "from truchas t " +
            "inner join historial_truchas ht on t.id = ht.id " +
            " where t.id_lote = idLote and t.estado='VIVA') ,0) as max, " +
            "COALESCE((select Round(min(mida)) " +
            "from truchas t " +
            "inner join historial_truchas ht on t.id = ht.id " +
            " where t.id_lote = idLote and t.estado='VIVA')  ,0) as min " +
            "from truchas " +
            " inner join lotes l on truchas.id_lote = l.id",{type:QueryTypes.SELECT})
    }
    

}
