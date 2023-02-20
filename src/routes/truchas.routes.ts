import express from 'express'
import {
    cambiarEstadoReproductivo, downloadTruchas,
    findAll,
    findAllByDevice,
    findAllByLotes,
    findLast,
    muerta, nuevaMedicion, nuevoFenotipo,
    remove,
    save,
    update, updateFenotipo
} from "../controllers/truchas.controller";
import {authMiddleware} from "../middleware/auth.middleware";

const router = express.Router()
router.route('')
    .post(authMiddleware,save)
    .get(authMiddleware,findAll)
    .put(authMiddleware,update)
    .delete(authMiddleware,remove);
router.route('/medicion')
    .post(authMiddleware,nuevaMedicion)
router.route('/fenotipo')
    .post(authMiddleware,nuevoFenotipo)

router.route('/fenotipo/:id')
    .put(authMiddleware, updateFenotipo)

router.route('/last')
    .get(authMiddleware,findLast)

router.route('/muerta/:id')
    .put(authMiddleware,muerta)

router.route('/lotes/:ids')
    .get(authMiddleware,findAllByLotes)

router.route('/download/:ids')
    .get(authMiddleware,downloadTruchas)

router.route('/:device/:id')
    .get(authMiddleware,findAllByDevice);

router.route('/reproductivo/:id')
    .put(authMiddleware,cambiarEstadoReproductivo)



export default router;
