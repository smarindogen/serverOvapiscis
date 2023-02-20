"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const router = express_1.Router();
router.route('/') // POST /login/ --> CUALQUIERA
    .post(login_controller_1.login);
exports.default = router;
