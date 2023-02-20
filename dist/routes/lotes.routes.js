"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lotes_controller_1 = require("../controllers/lotes.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.route('/')
    .post(auth_middleware_1.authMiddleware, lotes_controller_1.save)
    .get(auth_middleware_1.authMiddleware, lotes_controller_1.findAll)
    .put(auth_middleware_1.authMiddleware, lotes_controller_1.update);
router.route('/buscar')
    .get(auth_middleware_1.authMiddleware, lotes_controller_1.findLotes);
exports.default = router;
