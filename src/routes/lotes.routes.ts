import express from "express";
import {save, findAll, update, findLotes} from "../controllers/lotes.controller";
import {authMiddleware} from "../middleware/auth.middleware";

const router = express.Router()
router.route('/')
    .post(authMiddleware, save)
    .get(authMiddleware, findAll)
    .put(authMiddleware, update)
router.route('/buscar')
    .get(authMiddleware, findLotes)
export default router;
