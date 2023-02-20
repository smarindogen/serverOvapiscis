"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const huevos_controller_1 = require("../controllers/huevos.controller");
const router = express_1.Router();
router.route('')
    .post(auth_middleware_1.authMiddleware, huevos_controller_1.save)
    .get(auth_middleware_1.authMiddleware, huevos_controller_1.findAll)
    .put(auth_middleware_1.authMiddleware, huevos_controller_1.update);
exports.default = router;
