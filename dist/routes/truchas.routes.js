"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const truchas_controller_1 = require("../controllers/truchas.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.route('')
    .post(auth_middleware_1.authMiddleware, truchas_controller_1.save)
    .get(auth_middleware_1.authMiddleware, truchas_controller_1.findAll)
    .put(auth_middleware_1.authMiddleware, truchas_controller_1.update)
    .delete(auth_middleware_1.authMiddleware, truchas_controller_1.remove);
router.route('/medicion')
    .post(auth_middleware_1.authMiddleware, truchas_controller_1.nuevaMedicion);
router.route('/fenotipo')
    .post(auth_middleware_1.authMiddleware, truchas_controller_1.nuevoFenotipo);
router.route('/fenotipo/:id')
    .put(auth_middleware_1.authMiddleware, truchas_controller_1.updateFenotipo);
router.route('/last')
    .get(auth_middleware_1.authMiddleware, truchas_controller_1.findLast);
router.route('/muerta/:id')
    .put(auth_middleware_1.authMiddleware, truchas_controller_1.muerta);
router.route('/lotes/:ids')
    .get(auth_middleware_1.authMiddleware, truchas_controller_1.findAllByLotes);
router.route('/download/:ids')
    .get(auth_middleware_1.authMiddleware, truchas_controller_1.downloadTruchas);
router.route('/:device/:id')
    .get(auth_middleware_1.authMiddleware, truchas_controller_1.findAllByDevice);
router.route('/reproductivo/:id')
    .put(auth_middleware_1.authMiddleware, truchas_controller_1.cambiarEstadoReproductivo);
exports.default = router;
