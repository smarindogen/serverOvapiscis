import {Router} from "express";
import {avgLotesMida, avgLotesPeso, countLote, countTanque} from "../controllers/stats.controller";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router()
router.route("/tanques")
    .get(authMiddleware, countTanque)
router.route("/lotes")
    .get(authMiddleware, countLote)
router.route("/lotes/avg/peso")
    .get(authMiddleware, avgLotesPeso)
router.route("/lotes/avg/mida")
    .get(authMiddleware, avgLotesMida)
export default router
