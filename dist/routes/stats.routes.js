"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_controller_1 = require("../controllers/stats.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.Router();
router.route("/tanques")
    .get(auth_middleware_1.authMiddleware, stats_controller_1.countTanque);
router.route("/lotes")
    .get(auth_middleware_1.authMiddleware, stats_controller_1.countLote);
router.route("/lotes/avg/peso")
    .get(auth_middleware_1.authMiddleware, stats_controller_1.avgLotesPeso);
router.route("/lotes/avg/mida")
    .get(auth_middleware_1.authMiddleware, stats_controller_1.avgLotesMida);
exports.default = router;
