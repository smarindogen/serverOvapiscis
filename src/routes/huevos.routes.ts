import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {findAll, save, update} from "../controllers/huevos.controller";

const router = Router()
router.route('')
    .post(authMiddleware,save)
    .get(authMiddleware,findAll)
    .put(authMiddleware,update)
export default router;