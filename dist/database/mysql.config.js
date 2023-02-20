"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysql = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
exports.mysql = new sequelize_1.Sequelize(String(config_1.default.bd.name), String(config_1.default.bd.user), String(config_1.default.bd.password), {
    port: config_1.default.bd.port,
    host: config_1.default.bd.url,
    dialect: 'mysql'
});
