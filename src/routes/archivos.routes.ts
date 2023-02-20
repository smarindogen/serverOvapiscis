import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {save} from "../controllers/archivos.controller";

const router = Router()
router.route('/')
    .post(authMiddleware, save)
export default router
